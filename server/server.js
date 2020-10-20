const app = require('./app');
const config = require('./config/index');

const {PORT} = config;

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
