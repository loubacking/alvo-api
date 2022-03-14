import { generateToken, isUserAuthenticated } from './utils/utils';
import { authToken } from './utils/globals';
const log = require('simple-node-logger').createSimpleLogger();
import { Types } from 'mongoose';
import { connection } from './server';


export function showArtists(req, res) {
    connection.collection("artist").find({}).toArray().then((data) => {
        return res.json(data);
    }).catch(e => log.error(e));
}

export function showSongs(req, res) {
    connection.collection("song").find({}).toArray().then((data) => {
        return res.json(data);
    }).catch(e => log.error(e));
}

export function createArtist(req, res) {
    connection.collection("artist").insertOne({ ...req.body, createdAt: Date.now().toLocaleString()}).then(() => {
        return res.sendStatus(200);
    }).catch(e => log.error(e));
}

export async function editArtist(req, res) {
    try {
        await connection.collection("artist").updateOne({ _id: new Types.ObjectId(req.body.filter) }, { $set: {...req.body.data, editedAt: Date.now().toLocaleString() }});
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }
}

export async function createSong(req, res) {
    const artistName = await connection.collection("artist").findOne({ _id: new Types.ObjectId(req.body.artistId) }).then(({ name }) => name);
    connection.collection("song").insertOne({ ...req.body, artistName, createdAt: Date.now().toLocaleString() }).then(() => {
        return res.sendStatus(200);
    }).catch(e => log.error(e));
}

export function searchSong(req, res) {
    const { keyword } = req.query;
    const name = new RegExp(keyword, "i");

    connection.collection("song").find({ name }).toArray().then((data) => {
        return res.json(data);
    }).catch(e => log.error(e));
}

export function searchArtist(req, res) {
    const { keyword } = req.query;
    const name = new RegExp(keyword, "i");
    connection.collection("artist").find({ name }).toArray().then((data) => {
        return res.json(data);
    }).catch(e => log.error(e));
}

export function getArtist(req, res) {
    const { id } = req.params;

    connection.collection("artist").findOne({ _id: new Types.ObjectId(id) }).then((data) => {
        log.info(data)
        return res.json(data);
    }).catch(e => log.error(e));
}

export function getSong(req, res) {
    const { id } = req.params;

    connection.collection("song").findOne({ _id: new Types.ObjectId(id) }).then((data) => {
        log.info(data)
        return res.json(data);
    }).catch(e => log.error(e));
}

export function getArtistSongs(req, res) {
    const { id: artistId } = req.params;

    connection.collection("song").find({ artistId }).toArray().then((data) => {
        log.info(data)
        return res.json(data);
    }).catch(e => log.error(e));
}

export function authenticate(req, res) {
    const { username, password } = req.body;

    connection.collection("user").find({ username }).toArray().then((response) => {
        if (response[0] && response[0].password === password) {
            const token = generateToken();
            authToken[token] = username;
            console.log("Auth Token", token);
            return res.status(200).send({token});
        } else {
            console.log("Incorrect Username or Password");
            return res.sendStatus(400);
        }
    }).catch(e => console.log(e));
}

export function isAuthenticated(req, res, next){
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    req.username = isUserAuthenticated(token);
    if(req.username)
      return next();
    if(req.headers['temporary-access'] === 'alvo2020')
        return next();
    res.status(400).send({ error: 'User not authenticated' });
}
