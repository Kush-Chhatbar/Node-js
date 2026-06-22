const calculatorHandler = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Calculator</title></head>');
    res.write('<body><h1>Calculator</h1>')
    res.write('<form action="/calculate-result" method="POST"><input type="number" name="num1" placeholder="Number 1"><input type="number" name="num2" placeholder="Number 2"><button type="submit">Sum</button></form>');
    res.write('</body>');
    res.write('</html>');
    res.end();
};

module.exports = calculatorHandler;
