const router = require('express').Router();
const HttpStatus = require('http-status-codes');

const { Film } = require('../../database');

router.get('/', async (req, res) => {
	const films = await Film.findAll();
	res.status(HttpStatus.OK).json(films);
});

router.post('/', async (req, res) => {
	const film = await Film.create(req.body);
	res.status(HttpStatus.CREATED).send(film);
});

router.put('/:id', async (req, res) => {
	await Film.update(req.body, {
		where: { id: req.params.id }
	});

	res.status(HttpStatus.NO_CONTENT).send();
});

router.delete('/:id', async (req, res) => {
	await Film.destroy({
		where: { id: req.params.id }
	});
	res.status(HttpStatus.NO_CONTENT).send();
});

module.exports = router;
