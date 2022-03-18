import { Router } from 'express';
import FeesController from '../controllers/feesController';
const router = Router();

const { setUpFee } = FeesController
/* GET users listing. */
router.post('/', setUpFee);

export default router;
