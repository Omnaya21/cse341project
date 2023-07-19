import { Request, Response, Router } from 'express';
import { logout } from '../controllers/auth';
import { ensureAuth } from '../middleware';
import auth from './auth';
import post from './post';
import comment from './comment';
import tag from './tag';
import homeButton from '../views/button'

const router = Router();

router.get('/', homeButton)
  // #swagger.ignore = true

router.get('/login', (req: Request, res: Response) => {
  // #swagger.ignore = true
  res.redirect('/auth/github');
});
router.get('/logout', logout);

router.use('/auth', auth);

// Ensure user is authenticated on the following routes.
router.use(ensureAuth);

router.use('/post', post);
router.use('/comment', comment);
router.use('/tag', tag);
// router.use('/user', user);

export default router;
