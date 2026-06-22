const path = require('path');
const express = require('express');

const contactUsRouter = require('./routes/contactUsRouter');
const homeRouter = require('./routes/homeRouter');
const rootDir = require('./utils/pathUtils');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(homeRouter);

app.use(contactUsRouter);

app.use((req, res, next) => {
    console.log("Page not found:", req.url, req.method);  
    res.sendFile(path.join(rootDir, "views", "404.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});