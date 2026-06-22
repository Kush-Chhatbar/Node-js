let favouriteHomes = [];
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

module.exports = class Favourites{
    constructor(id, houseName, price, location, rating, photoUrl){
        this.id = id;
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }

    save() {
        Favourites.fetchAll((favouriteHomes) => {
            
            const exists = favouriteHomes.some(
                home => home.id === this.id
            );

            if (!exists) {
                favouriteHomes.push(this);
            }
            const favDataPath = path.join(rootDir, 'data', 'favourites.json');
            fs.writeFile(favDataPath, JSON.stringify(favouriteHomes), error => {
                console.log('File writing concluded', error);
            });
        });
    }

    static fetchAll(callback) {
        const favDataPath = path.join(rootDir, 'data', 'favourites.json');
        fs.readFile(favDataPath, (err, data) => {
            console.log("File read:", err,data);
            callback(!err ? JSON.parse(data) : []);
        });
    }

    static findById(homeId, callback) {
        Favourites.fetchAll((homes) => {
            callback(homes.find(home => home.id === homeId));
        });
    }

    static removeFromFavourite(homeId, callback){
        Favourites.fetchAll((favouriteHomes) => {
            favouriteHomes = favouriteHomes.filter(favouriteHome => favouriteHome.id !== homeId);
            const favDataPath = path.join(rootDir, 'data', 'favourites.json');
            fs.writeFile(favDataPath, JSON.stringify(favouriteHomes), callback);
        })
    }
};