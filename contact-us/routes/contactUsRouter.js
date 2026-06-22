const path = require('path');
const express = require('express');

const contactUsRouter = express.Router();
const rootDir = require('../utils/pathUtils');

contactUsRouter.get("/contact-us", (req, res, next) => {
    console.log("Handling /contact-us for GET:", req.url, req.method);
    res.sendFile(path.join(rootDir, "views", "contact-us.html"));
});

contactUsRouter.post("/contact-us", (req, res, next) => {
    console.log("Handling /contact-us for POST:", req.url, req.method);
    console.log("Submitted data:", req.body);
    res.sendFile(path.join(rootDir, "views", "contact-us-submitted.html"));
});

module.exports = contactUsRouter;