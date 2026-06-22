const fs = require('fs');

const requestHandler = (req, res) => {
    console.log(req.url, req.method);

    if(req.url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello World!</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username" placeholder="Username"><button type="submit">Create User</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }else if(req.url === '/products'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Welcome to Products Page!</h1></body>');
        res.write('</html>');
        return res.end();
    }else if(req.url === '/create-user' && req.method === 'POST'){
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const fullBody = Buffer.concat(body).toString();
            console.log(fullBody);
            const params = new URLSearchParams(fullBody);
            // const bodyObject = {};
            // for (const [key, value] of params.entries()) {
            //     bodyObject[key] = value;
            // }
            const bodyObject = Object.fromEntries(params.entries());
            console.log(bodyObject);
            const bodyString = JSON.stringify(bodyObject.username);
            fs.writeFile('user.txt', `Username: ${bodyString}\n`, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
        res.write('</html>');
        return res.end();
    }
    // process.exit();
}

module.exports = requestHandler;