const { localStorage: storage } = window;

export function setStorage(key: string, value: unknown) {
  return new Promise<void>((resolve, reject) => {
    try {
      storage.setItem(key, JSON.stringify(value));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export function getStorage<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    try {
      const item = storage.getItem(key);
      resolve(item ? JSON.parse(item) : null);
    } catch (error) {
      reject(error);
    }
  });
}

export function deleteStorage(key: string) {
  return new Promise<void>((resolve, reject) => {
    try {
      if (!key) {
        storage.clear();
      } else {
        storage.removeItem(key);
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
