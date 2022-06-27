const log = require('simple-node-logger').createSimpleLogger();
import { Types } from 'mongoose';

export function createArtist(req, res) {
    global.db.collection("artist").insertOne({ ...req.body, createdAt: Date.now().toLocaleString()}).then(() => {
        return res.sendStatus(200);
    }).catch(e => log.error(e));
}

export async function editArtist(req, res) {
    try {
        await global.db.collection("artist").updateOne({ _id: Types.ObjectId(req.body.filter) }, { $set: {...req.body.data, editedAt: Date.now().toLocaleString() }});
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }
}

export async function createSong(req, res) {
    const artistName = await global.db.collection("artist").findOne({ _id: new Types.ObjectId(req.body.artistId) }).then(({ name }) => name);
    global.db.collection("song").insertOne({ ...req.body, artistName, createdAt: Date.now().toLocaleString() }).then(() => {
        return res.sendStatus(200);
    }).catch(e => log.error(e));
}
