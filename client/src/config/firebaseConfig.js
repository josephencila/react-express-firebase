import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const {
    VITE_FIRE_API_KEY,
    VITE_FIRE_AUTH_DOMAIN,
    VITE_FIRE_PROJECT_ID,
    VITE_FIRE_STORAGE_BUCKET,
    VITE_FIRE_MESSAGING_SENDER_ID,
    VITE_FIRE_APP_ID,
    VITE_FIRE_MEASUREMENT_ID,
} = import.meta.env
 

const firebaseConfig = {
    apiKey: VITE_FIRE_API_KEY,
    authDomain: VITE_FIRE_AUTH_DOMAIN,
    projectId: VITE_FIRE_PROJECT_ID,
    storageBucket: VITE_FIRE_STORAGE_BUCKET,
    messagingSenderId: VITE_FIRE_MESSAGING_SENDER_ID,
    appId: VITE_FIRE_APP_ID,
    measurementId: VITE_FIRE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };