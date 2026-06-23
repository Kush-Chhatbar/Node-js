const Favourites = require('../models/favourites');
const Home = require('../models/home');

const getHostHomes = (req, res, next) => {
    const registeredHomes = Home.fetchAll().then(([registeredHomes, fields]) => {
        res.render("../views/host/host-home-list", 
            { registeredHomes: registeredHomes , 
              pageTitle: "Airbnb Host Homes" 
            })
    });
}

const getAddHome = (req, res, next) => {
    console.log("Second dummy middleware:", req.url, req.method);  
    res.render("../views/host/add-home", { pageTitle: "Airbnb - Add Home" });
}

const getHomeCreated = (req, res, next) => {
    console.log("Received form data:", req.body, req.body.house);
    const {id, houseName, price, location, rating, description, photoUrl} = req.body;
    const home = new Home(null, houseName, price, location, rating, description, photoUrl);
    home.save();
    res.render("../views/host/home-created", { pageTitle: "Airbnb - Home Created" });
}

const getHomeDetailsForEdit = (req, res, next) => {
    Home.findById(req.params.homeId)
        .then(([rows]) => {
            const home = rows[0];

            if (!home) {
                console.log("Home not found for updation.");
                return res.redirect("/host/homes");
            }

            res.render('host/edit-home', {
                home,
                pageTitle: "Airbnb Edit Home Details"
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/host/homes');
        });
};

const getHomeUpdated = (req, res, next) => {
    const { id, houseName, price, location, rating, description, photoUrl } = req.body;

    const updatedHome = new Home(
        id,
        houseName,
        price,
        location,
        rating,
        description,
        photoUrl
    );

    updatedHome.update()
        .then(() => {
            res.redirect("/host/homes");
        })
        .catch(err => {
            console.log("Error updating home:", err);
            res.status(500).send("Failed to update home");
        });
};

const getHomeDeleted = (req, res, next) => {
    const homeId = req.body.id;

    Home.deleteById(homeId)
        .then(() => {
            Favourites.removeFromFavourite(homeId, (error) => {
                if (error) {
                    console.log("Error while removing from favourites:", error);
                }

                res.redirect("/host/homes");
            });
        })
        .catch((error) => {
            console.log("Error while deleting home:", error);
            res.status(500).send("Failed to delete home.");
        });
};

exports.getAddHome = getAddHome;
exports.getHomeCreated = getHomeCreated;
exports.getHomeDetailsForEdit = getHomeDetailsForEdit;
exports.getHomeUpdated = getHomeUpdated;
exports.getHomeDeleted = getHomeDeleted;
exports.getHostHomes = getHostHomes;