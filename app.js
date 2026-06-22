const http = require('http');

const userRequestHandler = require('./user');
// function requestListener(req, res){
//     console.log(req);
// }

const server = http.createServer(userRequestHandler);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});