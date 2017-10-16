import express from 'express';
import * as amazonApi from '../middleware/amazonApi';

const router = express.Router();

router.get('/itemlookup/:asin', amazonApi.itemLookup);
router.get('/itemsearch/:keywords', amazonApi.itemSearch);
router.get('/browsenodelookup/:id', amazonApi.browseNodeLookup);

export default router;
