const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Unnecessary now, but useful once we start running our server in the cloud later on, per https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#get-port-number

app.get(["/", "/index.html"], (req, res) => {
    res.send("Hello World!");
});

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}

module.exports = app; // Unnecessary now, but useful once we start adding unit tests later on, per https://stackoverflow.com/a/33988296
