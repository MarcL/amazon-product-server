import NodeCache from 'node-cache';

const DEFAULT_CACHE_TIME = 60 * 60;
const cache = new NodeCache({stdTTL: DEFAULT_CACHE_TIME});

export default cache;
