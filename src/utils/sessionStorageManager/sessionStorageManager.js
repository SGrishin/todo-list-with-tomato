import isStorageAvailable from '../isStorageAvailable';

export default {
    getItem: (key) => {
        if (!isStorageAvailable('sessionStorage')) {
            return;
        }

        return JSON.parse(sessionStorage.getItem(key));
    },
    setItem: (key, value) => {
        if (!isStorageAvailable('sessionStorage')) {
            return;
        }

        sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
        if (!isStorageAvailable('sessionStorage')) {
            return;
        }

        sessionStorage.removeItem(key);
    }
};
