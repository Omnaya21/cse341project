// prettier-ignore
import {
  getTagById,
  insertTag,
  updateTag,
  deleteTag,
} from '../controllers/tag'
import { Router } from 'express';
import { handleErrors, validate } from '../middleware';
import { TagSchema } from '../schemas';

const router = Router();

router.get('/:tagId', handleErrors(getTagById));
router.post('/', validate(TagSchema), handleErrors(insertTag));
router.put('/:tagId', validate(TagSchema), handleErrors(updateTag));
router.delete('/:tagId', handleErrors(deleteTag));

export default router;
