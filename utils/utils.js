const uuidv4 = require('uuid/v4');
const globals = require('./globals');

function generateToken(){
    return uuidv4();
}

function isAuthenticated(token) {
    return globals.authToken[token] || false;
  }

module.exports = {
    generateToken,
    isAuthenticated
}

