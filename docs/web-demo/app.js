const express = require('express');
const sweet = require('express-sweet');

// Creates and configures an ExpressJS web server.
const app = express();

// Mount the extension.
sweet.mount(app);

module.exports = app;