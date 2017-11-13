import NodeCache from 'node-cache';

const DEFAULT_CACHE_TIME = 60 * 60;
const cache = new NodeCache({stdTTL: DEFAULT_CACHE_TIME});

const key = dataList => dataList.join('|');

const get = keyName => cache.get(keyName);
const set = (keyName, data) => cache.set(keyName, data);

export {key, get, set};
