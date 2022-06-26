import { authToken } from '../utils/globals';
import { generateToken } from '../utils/utils';

export class AuthService {
    authenticate({ username, password }, db) {
        console.log("<<<DB>>>", db);
        db.collection("user").find({ username }).toArray().then((response) => {
            console.log("Auth", response);
            const token = generateToken();
            authToken[token] = username;
            console.log("Auth Token", token);
        })
    }
}