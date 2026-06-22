let registeredHomes = [];
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');

module.exports = class Home{
    constructor(id, houseName, price, location, rating, photoUrl){
        this.id = id || Math.floor(Math.random() * 1000000).toString();
        this.houseName = houseName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.photoUrl = photoUrl;
    }

    save() {
        Home.fetchAll((registeredHomes) => {
            registeredHomes.push(this);
            const homeDataPath = path.join(rootDir, 'data', 'homes.json');
            fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
                console.log('File writing concluded', error);
            });
        });
    }

    static fetchAll(callback) {
        const homeDataPath = path.join(rootDir, 'data', 'homes.json');
        fs.readFile(homeDataPath, (err, data) => {
            console.log("File read:", err,data);
            callback(!err ? JSON.parse(data) : []);
        });
    }

    static findById(homeId, callback) {
        Home.fetchAll((homes) => {
            callback(homes.find(home => home.id === homeId));
        });
    }

    update(updatedHome) {
        Home.fetchAll((homes) => {
            const updatedHomes = homes.map(home => {
                if (home.id === updatedHome.id) {
                    return updatedHome;
                }
                return home;
            });

            const homeDataPath = path.join(rootDir, 'data', 'homes.json');

            fs.writeFile(
                homeDataPath,
                JSON.stringify(updatedHomes),
                (error) => {
                    console.log('File writing concluded', error);
                }
            );
        });
    }

    static deleteById(homeId, callback){
        this.fetchAll((homes) => {
            homes = homes.filter(home => home.id !== homeId);
            const homeDataPath = path.join(rootDir, 'data', 'homes.json');
            fs.writeFile(homeDataPath, JSON.stringify(homes), callback);
        });
    }
};
