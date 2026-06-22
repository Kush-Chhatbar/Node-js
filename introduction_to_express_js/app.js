const express = require('express');
const app = express();

app.use("/", (req, res, next) => {
    console.log("Came in first middleware:", req.url, req.method);
    // res.send("Hello from Express!");
    next();
});

app.use("/products", (req, res, next) => {
    console.log("Came in second middleware:", req.url, req.method);
    res.send("Welcome to Products Page!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});