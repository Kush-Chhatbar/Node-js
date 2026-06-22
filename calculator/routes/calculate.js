const calculateHandler = (req, res) => {
    const body = [];
    req.on('data', chunk => {
        console.log(chunk);
        body.push(chunk);
    });

    req.on('end', () => {
        const fullBody = Buffer.concat(body).toString();
        console.log(fullBody);
        const params = new URLSearchParams(fullBody);
        const num1 = parseFloat(params.get('num1'));
        const num2 = parseFloat(params.get('num2'));
        const result = num1 + num2;
        console.log(`Result: ${result}`);
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Calculator Result</title></head>');
        res.write('<body><h1>Calculator Result</h1>');
        res.write(`<h2>Result: ${result}</h2>`);
        res.write('</body>');
        res.write('</html>');
        res.end();
    });
};

module.exports = calculateHandler;
