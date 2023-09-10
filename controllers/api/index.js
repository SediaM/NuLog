const router = require('express').Router();
const userRoutes = require('./userRoute');
const blogRoutes = require('./blogRoute');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);

module.exports = router;