const express = require('express');
const path = require('path');

const storeRouter = require('./routes/storeRouter');
const hostRouter = require('./routes/hostRouter');
const rootDir = require('./utils/pathUtils');
const errorsController = require('./controllers/errorsController');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

//User router
app.use(storeRouter);

//Host router
app.use(hostRouter);

app.use(errorsController.pageNotFound);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});