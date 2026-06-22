const homeHandler = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Home Page</title></head>');
    res.write('<body><h1>Welcome to the Home Page!</h1><br/>');
    res.write('<a href="/calculator">Calculator </a><br/>');
    res.write('</body>');
    res.write('</html>');
    res.end();
};

module.exports = homeHandler;
