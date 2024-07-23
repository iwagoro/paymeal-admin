import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = require("/firebase-admin.json");
export const firebaseAdmin =
    getApps()[0] ??
    initializeApp({
        credential: cert(serviceAccount),
    });

export const auth = getAuth();
