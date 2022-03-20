import { Router } from 'express';
import FeesController from '../controllers/feesController';
const router = Router();

const { setUpFee, computeTransactionFee } = FeesController
/* GET users listing. */
router.post('/fees', setUpFee);
router.post('/compute-transaction-fee', computeTransactionFee);

export default router;
