const Services = require('./services/service')
const log = require('simple-node-logger').createSimpleLogger();
const Promise = require('bluebird');
var ObjectId = require('mongoose').Types.ObjectId;
const utils = require('./utils/utils');
const globals = require('./utils/globals');

function showArtists(req, res) {
    global.db.collection("artist").find({}).toArray().then((data) => {
        return res.json(data);
    }).catch(e => log.error(e));
}

function showSongs(req, res) {
    global.db.collection("song").find({}).toArray().then((data) => {
        return res.json(data);
    }).catch(e => log.error(e));
}

function createArtist(req, res) {
    global.db.collection("artist").insertOne(req.body).then(() => {
        return res.sendStatus(200);
    }).catch(e => log.error(e));
}

function createSong(req, res) {
    global.db.collection("song").insertOne(req.body).then(() => {
        return res.sendStatus(200);
    }).catch(e => log.error(e));
}

function searchSong(req, res) {
    const { keyword } = req.query;
    const name = new RegExp(keyword, "i");

    global.db.collection("song").find({ name }).toArray().then((data) => {
        return res.json(data);
    }).catch(e => log.error(e));
}

function searchArtist(req, res) {
    const { keyword } = req.query;
    const name = new RegExp(keyword, "i");

    global.db.collection("artist").find({ name }).toArray().then((data) => {
        return res.json(data);
    }).catch(e => log.error(e));
}

function getArtist(req, res) {
    const { id } = req.params;

    global.db.collection("artist").findOne({ _id: new ObjectId(id) }).then((data) => {
        log.info(data)
        return res.json(data);
    }).catch(e => log.error(e));
}

function getArtistSongs(req, res) {
    const { id: artistId } = req.params;

    global.db.collection("song").find({ artistId }).toArray().then((data) => {
        log.info(data)
        return res.json(data);
    }).catch(e => log.error(e));
}

function authenticate(req, res) {
    const { username, password } = req.body;

    global.db.collection("user").find({ username }).toArray().then((response) => {
        if (response[0] && response[0].password === password) {
            const token = utils.generateToken();
            globals.authToken[token] = username;
            console.log("Auth Token", token);
            return res.status(200).send({token});
        } else {
            console.log("Incorrect Username or Password");
            return res.sendStatus(400);
        }
    }).catch(e => console.log(e));
}

function isAuthenticated(req, res, next){
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    req.username = utils.isAuthenticated(token);
    if(req.username)
      return next();
    res.status(400).send({ error: 'User not authenticated' });
}

module.exports = {
    showArtists,
    showSongs,
    createArtist,
    createSong,
    searchArtist,
    searchSong,
    getArtist,
    getArtistSongs,
    authenticate,
    isAuthenticated
};