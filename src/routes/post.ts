// prettier-ignore
import {
  createPost,
  deletePost,
  getPostByPostId,
  getPostsByTag,
  getPostsByUsername,
  updatePost,
} from '../controllers/post';
import { Router } from 'express';
import { handleErrors, validate } from '../middleware';
import { PostSchema } from '../schemas';

const router = Router();

router.get('/findByTag', handleErrors(getPostsByTag));
router.get('/findByAuthor', handleErrors(getPostsByUsername));
router.get('/:postId', handleErrors(getPostByPostId));
router.post('/', validate(PostSchema), handleErrors(createPost));
router.put('/:postId', validate(PostSchema), handleErrors(updatePost));
router.delete('/:postId', handleErrors(deletePost));

// Swagger-autogen breaks when the controllers are wrapped in a higher order function.
// Keep these routes here just for swagger.json creation.
// router.get('/findByTag', getPostsByTag);
// router.get('/findByAuthor', getPostsByUsername);
// router.get('/:postId', getPostByPostId);
// router.post('/', validate(PostSchema), createPost);
// router.put('/:postId', validate(PostSchema), updatePost);
// router.delete('/:postId', deletePost);

export default router;
