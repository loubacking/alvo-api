const log = require('simple-node-logger').createSimpleLogger();
import { Types } from 'mongoose';

export async function editArtist(req, res) {
    try {
        await global.db.collection("artist").updateOne({ _id: Types.ObjectId(req.body.filter) }, { $set: {...req.body.data, editedAt: Date.now().toLocaleString() }});
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }
}
