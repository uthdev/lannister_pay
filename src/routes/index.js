import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', (req, res,) => {
  res.status(200).json({
    message: 'Welcome to lannister pay'
  })
});

export default router;
