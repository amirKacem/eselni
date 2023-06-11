export const setLocalStorageItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorageItem = (key) => localStorage.getItem(key);

export const removeStorageItem = (key) => {
    localStorage.removeItem(key);
};

export const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export const base64ToUtf8 = (str) => {
    return decodeURIComponent(escape(window.atob(str)));
};
