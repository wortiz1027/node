const router = require('express').Router();
const middlewares = require('./middlewares');
const filmsRouter = require('./api/films');
const usersRouter = require('./api/users');

router.use('/films', middlewares.checkToken, filmsRouter);
router.use('/users', usersRouter);

module.exports = router;
