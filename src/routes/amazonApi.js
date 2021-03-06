import express from 'express';
import * as amazonApi from '../middleware/amazonApi';
import amazonItemFilter from '../middleware/amazon/itemFilter';
import formatResponse from '../middleware/formatResponse';

const router = express.Router();

router.get('/itemsearch/', amazonApi.itemSearch, formatResponse);
router.get('/similaritylookup', amazonApi.similarityLookup, formatResponse);

// TODO : Properly implement
router.get('/itemlookup/:asin', amazonApi.itemLookup, formatResponse);
router.get('/browsenodelookup/:id', amazonApi.browseNodeLookup, formatResponse);

router.get('/itemfilter', amazonItemFilter, formatResponse);

export default router;
