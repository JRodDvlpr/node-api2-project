
// ### Express Router ###

const router = require('express').Router();

// ### POST Routes ###

const postRoutes = require('./posts/postRoutes');

// ### USE POST Routes ###

router.use('/posts', postRoutes);

// ### EXPORT ROUTES ###

module.exports = router