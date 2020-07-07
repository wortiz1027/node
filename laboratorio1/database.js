const { Sequelize } = require('sequelize');

const FilmModel = require('./models/films');
const UserModel = require('./models/users');

const sequelize = new Sequelize('db_links', 'root', 'mysql1', {
	host: 'localhost',
	port: 33060,
	dialect: 'mysql'
});

const Film = FilmModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
	console.log('Objetos sincronizados...');
});

module.exports = { Film, User };
