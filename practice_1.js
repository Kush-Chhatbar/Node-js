const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body>');
    res.write('<a href="/home">Home</a><br>');
    res.write('<a href="/men">Men</a><br>');
    res.write('<a href="/women">Women</a><br>');
    res.write('<a href="/kids">Kids</a><br>');
    res.write('<a href="/cart">Cart</a><br>');
    res.write('</body>');
    res.write('</html>');

    if(req.url === '/home'){
        res.write('<head><title>Home Page</title></head>');
        res.write('<body><h1>Welcome to Home Page!</h1></body>');
        res.write('</html>');
        return res.end();
    }else if(req.url === '/men'){
        res.write('<head><title>Men Page</title></head>'); 
        res.write('<body><h1>Welcome to Men Page!</h1></body>');
        res.write('</html>');
        return res.end();
    }else if(req.url === '/kids'){
        res.write('<head><title>Kids Page</title></head>'); 
        res.write('<body><h1>Welcome to Kids Page!</h1></body>');
        res.write('</html>');
        return res.end();
    }else if(req.url === '/women'){
        res.write('<head><title>Women Page</title></head>'); 
        res.write('<body><h1>Welcome to Women Page!</h1></body>');
        res.write('</html>');
        return res.end();
    }else if(req.url === '/cart'){
        res.write('<head><title>Cart Page</title></head>'); 
        res.write('<body><h1>Welcome to Cart Page!</h1></body>');
        res.write('</html>');
        return res.end();
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});