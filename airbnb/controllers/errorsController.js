exports.pageNotFound = (req, res, next) => {
    console.log("Handling 404 for:", req.url, req.method);
    res.status(404).render("404", { pageTitle: "Airbnb - Page Not Found" });
};