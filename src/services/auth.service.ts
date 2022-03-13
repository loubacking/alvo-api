const utils = require('../src/utils/utils');
const globals = require('../src/utils/globals');


class AuthService {
    authenticate({ username, password }, db) {
        console.log("<<<DB>>>", db);
        db.collection("user").find({ username }).toArray().then((response) => {
            console.log("Auth", response);
            const token = utils.createToken();
            globals.authToken[token] = username;
            console.log("Auth Token", token);
        })
    }

}

module.exports = AuthService;