// prettier-ignore
import {
  getCommentsByAuthor,
  insertComment,
  updateComment,
  deleteComment,
} from '../controllers/comment'
import { Router } from 'express';
import { handleErrors, validate } from '../middleware';
import { CommentSchema } from '../schemas';

const router = Router();

router.get('/findByAuthor', handleErrors(getCommentsByAuthor));
router.post('/', validate(CommentSchema), handleErrors(insertComment));
router.put('/:commentId', validate(CommentSchema), handleErrors(updateComment));
router.delete('/:commentId', handleErrors(deleteComment));

// Swagger-autogen breaks when the controllers are wrapped in a higher order function.
// Keep these routes here just for swagger.json creation.v
// router.get('/findByAuthor', getCommentsByAuthor);
// router.post('/', validate(CommentSchema), insertComment);
// router.put('/:commentId', validate(CommentSchema), updateComment);
// router.delete('/:commentId', deleteComment);

export default router;
