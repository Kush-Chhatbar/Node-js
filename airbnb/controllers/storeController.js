const Home = require('../models/home');
const Favourites = require('../models/favourites');
const { post } = require('../routes/storeRouter');

const getIndex = (req, res, next) => {
    const registeredHomes = Home.fetchAll().then(([registeredHomes, fields]) => {
        res.render("../views/store/index", 
            { registeredHomes: registeredHomes , 
              pageTitle: "Airbnb" 
            })
    });
};

const getHomes = (req, res, next) => {
        const registeredHomes = Home.fetchAll().then(([registeredHomes, fields]) => {
        res.render("../views/store/home-list", 
            { 
                registeredHomes: registeredHomes , 
                pageTitle: "Airbnb Homes" 
            })
    });
};

const getHomeDetails = (req, res, next) => {
    Home.findById(req.params.homeId).then(([rows]) => {
        const home = rows[0];
        if(!home){
            res.redirect("/homes");
        }else{
            res.render('store/home-detail', {
                home: home,
                pageTitle: "Airbnb Home Details"
            });
        }
    });
};


const getBookings = (req, res, next) =>{
    const registeredHomes = Home.fetchAll().then(([registeredHomes, fields]) => {
        res.render("../views/store/bookings", 
            { 
                registeredHomes: registeredHomes , 
                pageTitle: "Airbnb Bookings"
            })
    });
};

const getFavourites = (req, res, next) => {
    const favouriteHomes = Favourites.fetchAll((favouriteHomes) => res.render("../views/store/favourite-list", { favouriteHomes: favouriteHomes , pageTitle: "Airbnb Favourites" }));
};

const postAddToFavourite = (req, res, next) => {
    console.log("Came to log the favourites", req.body);
    const homeId = req.body.id;

    Home.findById(homeId, (home) => {

        if (!home) {
            return res.redirect('/homes');
        }

        const favourite = new Favourites(
            home.id,
            home.houseName,
            home.price,
            home.location,
            home.rating,
            home.description,
            home.photoUrl
        );

        favourite.save();
    
        res.redirect("/favourites");
    });
};

const getFavouriteRemoved = (req, res, next) => {
    const homeId = req.body.id;

    Favourites.removeFromFavourite(homeId, error => {
        if(error){
            console.log("Error removing favourite home: ", error);
        }
        res.redirect("/favourites");
    });
};

exports.getIndex = getIndex;
exports.getHomes = getHomes;
exports.getHomeDetails = getHomeDetails;
exports.getBookings = getBookings;
exports.getFavourites = getFavourites;
exports.postAddToFavourite = postAddToFavourite;
exports.getFavouriteRemoved = getFavouriteRemoved;