import uuidv4 from "uuid/v4";
import { authToken } from "./globals";

export function generateToken() {
  return uuidv4();
}

export function isUserAuthenticated(token: string) {
  return authToken[token] || false;
}
