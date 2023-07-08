import { Router } from 'express';
import passport from 'passport';
import { login } from '../controllers/auth';

const router = Router();

router.get(
  '/github',
  // #swagger.ignore = true
  passport.authenticate('github')
);

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/', failureMessage: true }), login);

export default router;
