const http = require('http');
const calculatorRequestHandler = require('./handler');

const server = http.createServer(calculatorRequestHandler);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});