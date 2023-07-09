// prettier-ignore
import {
  getTagById,
  insertTag,
  updateTag,
  deleteTag,
  getTagByName,
  getAllTags,
} from '../controllers/tag'
import { Router } from 'express';
import { handleErrors, validate } from '../middleware';
import { TagSchema } from '../schemas';

const router = Router();

router.get('/tagName', handleErrors(getTagByName));
router.get('/:tagId', handleErrors(getTagById));
router.get('/', handleErrors(getAllTags));
router.post('/', validate(TagSchema), handleErrors(insertTag));
router.put('/:tagId', validate(TagSchema), handleErrors(updateTag));
router.delete('/:tagId', handleErrors(deleteTag));

// Swagger-autogen breaks when the controllers are wrapped in a higher order function.
// Keep these routes here just for swagger.json creation.
// router.get('/tagName', getTagByName);
// router.get('/:tagId', getTagById);
// router.get('/', getAllTags);
// router.post('/', validate(TagSchema), insertTag);
// router.put('/:tagId', validate(TagSchema), updateTag);
// router.delete('/:tagId', deleteTag);

export default router;
