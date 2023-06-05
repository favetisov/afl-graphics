import { debounce } from 'lodash';
import { autorun } from 'mobx';
import Dexie from 'dexie';
import { schema } from '../../../schema/src/schema';

// function key(store, propName) {
//     return envState.appKey + "_" + store.constructor.name + "_" + propName;
// }

const db: any = new Dexie('UI'); //todo add appKey
db.version(1).stores({ stores: 'name' });

export const saveStore = (store, propName) => {
  // return debounce(async () => {
  //     if (store[propName]) {
  //         db.set()
  //         await setIdb(key(store, propName), await zipModel(store[propName]));
  //     }
  // }, 300);
};

export const loadFromStore = async (store, propName) => {
  // const items = await getIdb(key(store, propName));
  // if (items) {
  //     store[propName] = await unzipModel(items);
  //     store.loaded = true;
  //     return store[propName];
  // }
};

export const makePersistable = async (store, storeName: string, propertiesNames: string[]) => {
  const data = await db.stores.get(storeName);
  console.log(data);

  // this.db = new Dexie('LFL-models'); // todo add environment app key
  // const stores = Object.keys(schema).reduce((stores, key) => {
  //     stores[key] = `_id`;
  //     return stores;
  // }, {});
  // this.db.version(1).stores(stores);

  // autorun(async () => {

  // });
  // return data;
  // store.save = saveStore(store, propName);
  // const data = await loadFromStore(store, propName);
  // autorun(async () => {
  //     store[propName];
  //     store.save();
  // });
  // return data;
};
