const { upload } = require('../libs/multer');
const { container } = require('../loaders/container.loader');
const { authenticate } = require('../middlewares/authenticate.middleware');
const { validateSchema } = require('../middlewares/validate_schema.middleware');
const {
  GET_ALL_POSTS,
  GET_POST,
  CREATE_POST,
  UPDATE_POST,
} = require('../schemas/post.schema');

const router = require('express').Router();

const postController = container.resolve('postController');

router.use(authenticate);

router.get('/', validateSchema(GET_ALL_POSTS), postController.getAllPosts);

router.get('/:id', validateSchema(GET_POST), postController.getPostById);

router.post(
  '/',
  upload.array('attachments'),
  validateSchema(CREATE_POST),
  postController.createPost
);

router.patch('/:id', validateSchema(UPDATE_POST), postController.updatePost);

module.exports = router;
