// ═══════════════════════════════════════════════════════════
// BMS Firebase Configuration & Helpers
// Yeh file har HTML page mein load hoti hai
// ═══════════════════════════════════════════════════════════

// Firebase SDK imports (CDN modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc,
  updateDoc, deleteDoc, query, where, orderBy, onSnapshot, writeBatch
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import {
  getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-storage.js";

// ─── Your Firebase Config ───
const firebaseConfig = {
  apiKey: "AIzaSyCcQLSmzkImmqNJtIzrU_fUwOWY0eYs2o4",
  authDomain: "surevisaconsultant-936f0.firebaseapp.com",
  projectId: "surevisaconsultant-936f0",
  storageBucket: "surevisaconsultant-936f0.firebasestorage.app",
  messagingSenderId: "97313884232",
  appId: "1:97313884232:web:2eaab151b617cbbe9f307d",
  measurementId: "G-6F4N0NNFZK"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ═══════════════════════════════════════════════════════════
// BMS Database Helpers
// Saari files yahi functions use karengi
// ═══════════════════════════════════════════════════════════
window.BMS = {
  db,
  storage,

  // ─── Upload file to Firebase Storage ───
  // path: e.g. 'visa/client123/passport.pdf'
  // file: File object from <input type="file">
  // Returns: { url, path, name, size, type }
  async uploadFile(path, file){
    try {
      const ref = storageRef(storage, path);
      const snap = await uploadBytes(ref, file);
      const url = await getDownloadURL(snap.ref);
      return {
        url,
        path: snap.ref.fullPath,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      };
    } catch(e){
      console.error('uploadFile error:', e);
      throw e;
    }
  },

  // ─── Upload multiple files ───
  // Returns array of file metadata objects
  async uploadFiles(folder, files){
    const results = [];
    for(const file of files){
      // Create unique filename: timestamp_originalname
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filename = Date.now() + '_' + safeName;
      const meta = await this.uploadFile(folder + '/' + filename, file);
      results.push(meta);
    }
    return results;
  },

  // ─── Delete file from Storage ───
  async deleteFile(path){
    try {
      await deleteObject(storageRef(storage, path));
      return true;
    } catch(e){
      console.error('deleteFile error:', e);
      // Don't throw — file might not exist
      return false;
    }
  },

  // ─── Read all documents from a collection ───
  async getAll(collectionName){
    try {
      const snap = await getDocs(collection(db, collectionName));
      const items = [];
      snap.forEach(d => items.push({ id: d.id, ...d.data() }));
      return items;
    } catch(e){
      console.error('BMS.getAll error:', e);
      return [];
    }
  },

  // ─── Read one document ───
  async getOne(collectionName, id){
    try {
      const ref = doc(db, collectionName, id);
      const snap = await getDoc(ref);
      if(!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    } catch(e){
      console.error('BMS.getOne error:', e);
      return null;
    }
  },

  // ─── Add new doc (auto ID) ───
  async add(collectionName, data){
    try {
      const ref = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString()
      });
      return ref.id;
    } catch(e){
      console.error('BMS.add error:', e);
      throw e;
    }
  },

  // ─── Set doc with specific ID (create or overwrite) ───
  async set(collectionName, id, data){
    try {
      await setDoc(doc(db, collectionName, id), data);
      return true;
    } catch(e){
      console.error('BMS.set error:', e);
      throw e;
    }
  },

  // ─── Update doc ───
  async update(collectionName, id, data){
    try {
      await updateDoc(doc(db, collectionName, id), data);
      return true;
    } catch(e){
      console.error('BMS.update error:', e);
      throw e;
    }
  },

  // ─── Delete doc ───
  async delete(collectionName, id){
    try {
      await deleteDoc(doc(db, collectionName, id));
      return true;
    } catch(e){
      console.error('BMS.delete error:', e);
      throw e;
    }
  },

  // ─── Real-time listener (data auto-update jab kuch change ho) ───
  listen(collectionName, callback){
    return onSnapshot(collection(db, collectionName), snap => {
      const items = [];
      snap.forEach(d => items.push({ id: d.id, ...d.data() }));
      callback(items);
    });
  },

  // ─── Settings (single doc for admin pass etc.) ───
  async getSetting(key, defaultVal = null){
    const item = await this.getOne('settings', key);
    return item ? item.value : defaultVal;
  },

  async setSetting(key, value){
    return this.set('settings', key, { value, updatedAt: new Date().toISOString() });
  }
};

// Make available globally
console.log('✅ BMS Firebase ready');
