const path = require('path');
const express = require('express');

const storeRouter = express.Router();
const rootDir = require('../utils/pathUtils');
const storeController = require('../controllers/storeController');

//index page
storeRouter.get("/", storeController.getIndex);

//home pages
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/home-details/:homeId", storeController.getHomeDetails);

//bookings page
storeRouter.get("/bookings", storeController.getBookings);

//favourites page
storeRouter.get("/favourites", storeController.getFavourites);
storeRouter.post("/add-to-favourites", storeController.postAddToFavourite);
storeRouter.post("/remove-favourite", storeController.getFavouriteRemoved);

module.exports = storeRouter;