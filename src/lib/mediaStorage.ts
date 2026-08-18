// IndexedDB helper to store presentation media persistently (images/videos)

const DB_NAME = 'AfilaPresentationDB'
const DB_VERSION = 1
const STORE_NAME = 'media_slots'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export interface StoredMedia {
  id: string
  file: Blob
  name: string
  type: string
  updatedAt: number
}

export async function saveMediaToDB(id: string, file: File | Blob): Promise<void> {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)

    const record: StoredMedia = {
      id,
      file,
      name: (file as File).name || 'media',
      type: file.type,
      updatedAt: Date.now(),
    }

    store.put(record)
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } catch (err) {
    console.error('Failed to save media to IndexedDB:', err)
  }
}

export async function getMediaFromDB(id: string): Promise<StoredMedia | null> {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(id)

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  } catch (err) {
    console.error('Failed to get media from IndexedDB:', err)
    return null
  }
}

export async function deleteMediaFromDB(id: string): Promise<void> {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.delete(id)

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
  } catch (err) {
    console.error('Failed to delete media from IndexedDB:', err)
  }
}
