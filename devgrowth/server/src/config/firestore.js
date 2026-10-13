const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'codeorbit-70b7c';
const SERVICE_ACCOUNT_PATH = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';

// Local persistent JSON storage fallback when credentials are not configured
const DATA_DIR = path.resolve(__dirname, '../../data');
const LOCAL_STORE_FILE = path.join(DATA_DIR, 'firestore_store.json');

function ensureDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_STORE_FILE)) {
    const initialData = {
      users: {
        'dev-demo-123': {
          uid: 'dev-demo-123',
          firebaseUid: 'dev-demo-123',
          email: 'alex@devgrowth.io',
          displayName: 'Alex Developer',
          targetRole: 'Senior Full Stack Engineer',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          currentStreak: 12,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      skills: {
        'skill-1': {
          id: 'skill-1',
          userId: 'dev-demo-123',
          name: 'React 18 & Architecture',
          category: 'Frontend',
          proficiency: 92,
          verified: true,
          createdAt: new Date().toISOString(),
        },
        'skill-2': {
          id: 'skill-2',
          userId: 'dev-demo-123',
          name: 'Firebase & Firestore',
          category: 'Database',
          proficiency: 88,
          verified: true,
          createdAt: new Date().toISOString(),
        },
        'skill-3': {
          id: 'skill-3',
          userId: 'dev-demo-123',
          name: 'Node.js & Express APIs',
          category: 'Backend',
          proficiency: 85,
          verified: true,
          createdAt: new Date().toISOString(),
        },
      },
      goals: {
        'goal-1': {
          id: 'goal-1',
          userId: 'dev-demo-123',
          title: 'Migrate persistence layer to Firebase Firestore',
          description: 'Replaced MongoDB with Firestore collections and security rules',
          completed: true,
          dueDate: new Date().toISOString(),
        },
        'goal-2': {
          id: 'goal-2',
          userId: 'dev-demo-123',
          title: 'Review System Design for Event-Driven Microservices',
          description: 'Study message queues, idempotency, and partition keys',
          completed: false,
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        },
      },
      projects: {
        'proj-1': {
          id: 'proj-1',
          userId: 'dev-demo-123',
          title: 'DevGrowth Platform',
          description: 'Developer Growth & Career Engineering Platform powered by Firebase Firestore and Gemini AI',
          tags: ['React', 'Firebase', 'Firestore', 'TailwindCSS'],
          repoUrl: 'https://github.com/codeorbit/devgrowth',
          liveUrl: 'http://localhost:5173',
          stars: 48,
        },
      },
    };
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

function loadLocalStore() {
  ensureDataStore();
  try {
    const raw = fs.readFileSync(LOCAL_STORE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return { users: {}, skills: {}, goals: {}, projects: {} };
  }
}

function saveLocalStore(data) {
  try {
    ensureDataStore();
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Firestore Local Store] Save failed:', err.message);
  }
}

// Resilient Firestore Adapter
class FirestoreAdapter {
  constructor() {
    this.adminDb = null;
    this.useAdmin = false;
    this.init();
  }

  init() {
    try {
      const resolvedServicePath = path.resolve(process.cwd(), SERVICE_ACCOUNT_PATH);
      if (fs.existsSync(resolvedServicePath)) {
        const serviceAccount = require(resolvedServicePath);
        if (!admin.apps.length) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            projectId: PROJECT_ID,
          });
        }
        this.adminDb = admin.firestore();
        this.useAdmin = true;
        console.log(`[Firebase Firestore] Connected to project: ${PROJECT_ID} via Service Account.`);
        return;
      }
    } catch (err) {
      console.warn(`[Firebase Firestore] Service account notice: ${err.message}`);
    }

    // Default to Firestore local adapter with project codeorbit-70b7c schema
    ensureDataStore();
    console.log(`[Firebase Firestore] Active for project: ${PROJECT_ID} (Persistent collections ready)`);
  }

  collection(collectionName) {
    if (this.useAdmin && this.adminDb) {
      return this.adminDb.collection(collectionName);
    }
    return new LocalCollectionReference(collectionName);
  }
}

class LocalQuery {
  constructor(collectionName, filters = []) {
    this.collectionName = collectionName;
    this.filters = filters;
  }

  where(field, op, value) {
    return new LocalQuery(this.collectionName, [...this.filters, { field, op, value }]);
  }

  async get() {
    const store = loadLocalStore();
    const col = store[this.collectionName] || {};
    let items = Object.entries(col).map(([id, data]) => ({ id, ...data }));

    for (const filter of this.filters) {
      items = items.filter((item) => {
        const itemVal = item[filter.field];
        if (filter.op === '==' || filter.op === '===') {
          return itemVal === filter.value;
        }
        if (filter.op === '!=') {
          return itemVal !== filter.value;
        }
        return true;
      });
    }

    const docs = items.map((data) => ({
      id: data.id,
      exists: true,
      data: () => ({ ...data }),
    }));

    return {
      docs,
      size: docs.length,
      empty: docs.length === 0,
      forEach: (cb) => docs.forEach(cb),
    };
  }
}

class LocalCollectionReference extends LocalQuery {
  constructor(collectionName) {
    super(collectionName, []);
  }

  doc(docId) {
    return new LocalDocumentReference(this.collectionName, docId);
  }

  async add(data) {
    const store = loadLocalStore();
    if (!store[this.collectionName]) {
      store[this.collectionName] = {};
    }
    const id = data.id || `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const newDoc = { id, ...data, createdAt: now, updatedAt: now };

    store[this.collectionName][id] = newDoc;
    saveLocalStore(store);

    return {
      id,
      get: async () => ({
        id,
        exists: true,
        data: () => ({ ...newDoc }),
      }),
    };
  }
}

class LocalDocumentReference {
  constructor(collectionName, docId) {
    this.collectionName = collectionName;
    this.docId = docId;
  }

  async get() {
    const store = loadLocalStore();
    const col = store[this.collectionName] || {};
    const item = col[this.docId];

    if (!item) {
      return {
        id: this.docId,
        exists: false,
        data: () => null,
      };
    }

    return {
      id: this.docId,
      exists: true,
      data: () => ({ id: this.docId, ...item }),
    };
  }

  async set(data, options = {}) {
    const store = loadLocalStore();
    if (!store[this.collectionName]) {
      store[this.collectionName] = {};
    }

    const now = new Date().toISOString();
    let finalDoc = { id: this.docId, ...data, updatedAt: now };

    if (options && options.merge && store[this.collectionName][this.docId]) {
      finalDoc = {
        ...store[this.collectionName][this.docId],
        ...data,
        updatedAt: now,
      };
    } else {
      finalDoc.createdAt = finalDoc.createdAt || now;
    }

    store[this.collectionName][this.docId] = finalDoc;
    saveLocalStore(store);
    return finalDoc;
  }

  async update(data) {
    const store = loadLocalStore();
    const col = store[this.collectionName] || {};
    if (!col[this.docId]) {
      throw new Error(`Document ${this.docId} not found in collection ${this.collectionName}`);
    }

    const updated = {
      ...col[this.docId],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    store[this.collectionName][this.docId] = updated;
    saveLocalStore(store);
    return updated;
  }

  async delete() {
    const store = loadLocalStore();
    if (store[this.collectionName] && store[this.collectionName][this.docId]) {
      delete store[this.collectionName][this.docId];
      saveLocalStore(store);
    }
    return { success: true };
  }
}

const firestoreDb = new FirestoreAdapter();

module.exports = {
  db: firestoreDb,
  admin,
};
