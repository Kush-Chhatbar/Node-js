const homeHandler = require('./routes/home');
const calculatorHandler = require('./routes/calculator');
const calculateHandler = require('./routes/calculate');

const requestHandler = (req, res) => {
    console.log(req.url, req.method);

    if(req.url === '/'){
        homeHandler(req, res);
    } else if(req.url === '/calculator'){
        calculatorHandler(req, res);
    } else if(req.url === '/calculate-result' && req.method === 'POST'){
        calculateHandler(req, res);
    } else {
        res.end();
    }
};

module.exports = requestHandler;