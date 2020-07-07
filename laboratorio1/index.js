const express = require('express');
const parser = require('body-parser');
const router = require('./routers/api');

const app = express();

require('./database');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(3000, () => {
	console.log('Server on port 3000...');
});
