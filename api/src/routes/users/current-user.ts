import express from 'express';
import { currentUser } from '../../common';
const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  //console.log(req.session);
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
