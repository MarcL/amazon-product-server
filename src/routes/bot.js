import express from 'express';
import * as botApi from '../middleware/botApi';

const router = express.Router();

router.get('/gifts/:id', botApi.getPresentList);

export default router;
