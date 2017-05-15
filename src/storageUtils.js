// utility functions for using react-native-storage
// https://github.com/sunnylqm/react-native-storage

import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

export const initStorage = () => {
    let storage = new Storage({
        // maximum capacity, default 1000 
        size: 1000,

        // Use AsyncStorage for RN, or window.localStorage for web.
        // If not set, data would be lost after reload.
        storageBackend: AsyncStorage,

        // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
        // can be null, which means never expire.
        defaultExpires: null,

        // cache data in the memory. default is true.
        enableCache: true,

        // if data was not found in storage or expired,
        // the corresponding sync method will be invoked and return 
        // the latest data.
        sync: {
            // we'll talk about the details later.
        }
    });

    return storage;
}

export const saveToStorage = (storage, key, data) => {
    storage.save({
        key,   // Note: Do not use underscore("_") in key!
        data,
    });
}

export const loadFromStorage = (storage, key) => {
    return new Promise(function (resolve, reject) {
        storage.load({
            key,

            // autoSync(default true) means if data not found or expired,
            // then invoke the corresponding sync method
            autoSync: true,

            // syncInBackground(default true) means if data expired,
            // return the outdated data first while invoke the sync method.
            // It can be set to false to always return data provided by sync method when expired.(Of course it's slower)
            syncInBackground: true,

            // you can pass extra params to sync method
            // see sync example below for example
            syncParams: {
                extraFetchOptions: {
                    // blahblah
                },
                someFlag: true,
            },
        }).then(ret => {
            // found data go to then()
            console.log(ret)
            resolve({
                type: 'success',
                item: ret
            })
        }).catch(err => {
            // any exception including data not found 
            // goes to catch()
            console.log(err.message);
            reject({
                type: 'error',
                error: err
            })
        })
    });
}

export const removeFromStorage = (storage, key) => {
    storage.remove({
        key
    });
}