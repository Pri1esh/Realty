const updateSessionStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.setItem(key, value);
  }
};

const deleteSessionStorage = (key: string) => {
  if (typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem(key)) {
    sessionStorage.removeItem(key);
  }
};

export { updateSessionStorage, deleteSessionStorage };
