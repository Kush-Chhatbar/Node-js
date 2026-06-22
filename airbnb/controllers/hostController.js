const Favourites = require('../models/favourites');
const Home = require('../models/home');

const getHostHomes = (req, res, next) => {
    const registeredHomes = Home.fetchAll((registeredHomes) => res.render("../views/host/host-home-list", { registeredHomes: registeredHomes , pageTitle: "Airbnb Host Homes" }));
}

const getAddHome = (req, res, next) => {
    console.log("Second dummy middleware:", req.url, req.method);  
    res.render("../views/host/add-home", { pageTitle: "Airbnb - Add Home" });
}

const getHomeCreated = (req, res, next) => {
    console.log("Received form data:", req.body, req.body.house);
    const {id, houseName, price, location, rating, photoUrl} = req.body;
    const home = new Home(null, houseName, price, location, rating, photoUrl );
    home.save();
    res.render("../views/host/home-created", { pageTitle: "Airbnb - Home Created" });
}

const getHomeDetailsForEdit = (req, res, next) => {
    Home.findById(req.params.homeId, (home) => {
        if(!home){
            console.log("Home not found for updation.")
            res.redirect("/host/homes");
        }else{
            res.render('host/edit-home', {
                home: home,
                pageTitle: "Airbnb Edit Home Details"
            });
        }
    });
}

const getHomeUpdated = (req, res, next) => {
    const {id, houseName, price, location, rating, photoUrl} = req.body;
    const updatedHome  = new Home(id, houseName, price, location, rating, photoUrl);
    console.log(updatedHome);
    updatedHome.update(updatedHome);
    res.render("../views/host/home-updated", { pageTitle: "Airbnb - Home Detils Updated" });
}

const getHomeDeleted = (req, res, next) => {
    const homeId = req.body.id;
    Home.deleteById(homeId, error => {
        if(error){
            console.log("Error while deleting home", error);
        }
        Favourites.removeFromFavourite(homeId, error => {
            if(error){
                console.log("Error while deleting home", error);
            }
            res.redirect("/host/homes");
        });
    });
}

exports.getAddHome = getAddHome;
exports.getHomeCreated = getHomeCreated;
exports.getHomeDetailsForEdit = getHomeDetailsForEdit;
exports.getHomeUpdated = getHomeUpdated;
exports.getHomeDeleted = getHomeDeleted;
exports.getHostHomes = getHostHomes;