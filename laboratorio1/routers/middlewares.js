const jwt = require('jwt-simple');
const moment = require('moment');
const HttpStatus = require('http-status-codes');

const checkToken = (req, res, next) => {
	if (!req.headers['token']) {
		return res.status(HttpStatus.UNAUTHORIZED).json({
			errors: 'Se requiere token para consultar el recurso solicitado...'
		});
	}

	const token = req.headers['token'];
	let payload = {};

	try {
		payload = jwt.decode(token, 'frase secreta');
	} catch (err) {
		return res
			.status(HttpStatus.FORBIDDEN)
			.json({ error: 'El token es incorrecto' });
	}

	if (payload.expiredAt < moment().unix()) {
		return res
			.status(HttpStatus.UNAUTHORIZED)
			.json({ error: 'El token ha expirado' });
	}

	req.userId = payload.userId;

	next();
};

module.exports = {
	checkToken: checkToken
};
