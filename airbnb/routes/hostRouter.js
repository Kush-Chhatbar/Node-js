const path = require('path');
const express = require('express');

const hostRouter = express.Router();
const rootDir = require('../utils/pathUtils');
const hostController = require('../controllers/hostController');

hostRouter.prefix = "/host";

hostRouter.get(`${hostRouter.prefix}/add-home`, hostController.getAddHome);
hostRouter.post(`${hostRouter.prefix}/add-home`, hostController.getHomeCreated);
hostRouter.get(`${hostRouter.prefix}/edit-home/:homeId`, hostController.getHomeDetailsForEdit);
hostRouter.post(`${hostRouter.prefix}/update-home`, hostController.getHomeUpdated);
hostRouter.get(`${hostRouter.prefix}/homes`, hostController.getHostHomes);
hostRouter.post(`${hostRouter.prefix}/delete-home`, hostController.getHomeDeleted);

module.exports = hostRouter;