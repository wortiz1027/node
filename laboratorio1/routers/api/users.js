const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');

const { check, validationResult } = require('express-validator');
const { User } = require('../../database');

router.post(
	'/register',
	[
		check('username', 'el campo username es obligatorio').not().isEmpty(),
		check('password', 'el campo password es obligatorio').not().isEmpty(),
		check('email', 'el email debe estar correcto').isEmail()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res
				.status(HttpStatus.UNPROCESSABLE_ENTITY)
				.json({ errors: errors.array() });
		}

		req.body.password = bcrypt.hashSync(req.body.password, 10);
		const user = await User.create(req.body);
		res.status(HttpStatus.CREATED).json(user);
	}
);

router.post('/login', async (req, res) => {
	const user = await User.findOne({
		where: { email: req.body.email }
	});

	if (user) {
		const isPassEquals = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (isPassEquals) {
			res.status(HttpStatus.OK).json({ success: createToken(user) });
		} else {
			res.status(HttpStatus.FORBIDDEN).json({
				error: 'Password invalido!'
			});
		}
	} else {
		res.status(HttpStatus.NOT_FOUND).json({ error: 'usuario invalido!' });
	}
});

const createToken = (user) => {
	const payload = {
		userId: user.id,
		createAt: moment().unix(),
		expiredAt: moment().add(5, 'minutes').unix()
	};

	return jwt.encode(payload, 'frase secreta');
};

module.exports = router;
