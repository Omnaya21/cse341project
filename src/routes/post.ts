// prettier-ignore
import {
  createPost,
  deletePost,
  getPostByPostId,
  getPostsByTag,
  getPostsByUserId,
  updatePost,
} from '../controllers/post';
import { Router } from 'express';
import { handleErrors, validate } from '../middleware';
import { PostSchema } from '../schemas';

const router = Router();

router.get('/:postId', handleErrors(getPostByPostId));
router.get('/findByTag', handleErrors(getPostsByTag));
router.get('/findByUser/:userId', handleErrors(getPostsByUserId));

router.post('/', validate(PostSchema), handleErrors(createPost));

router.put('/:postId', validate(PostSchema), handleErrors(updatePost));

router.delete('/:postId', handleErrors(deletePost));

export default router;
