// prettier-ignore
import {
  getCommentById,
  insertComment,
  updateComment,
  deleteComment,
} from '../controllers/comment'
import { Router } from 'express';
import { handleErrors, validate } from '../middleware';
import { CommentSchema } from '../schemas';

const router = Router();

router.get('/:commentId', handleErrors(getCommentById));
router.post('/', validate(CommentSchema), handleErrors(insertComment));
router.put('/:commentId', validate(CommentSchema), handleErrors(updateComment));
router.delete('/:commentId', handleErrors(deleteComment));

export default router;
