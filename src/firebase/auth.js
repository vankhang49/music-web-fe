import {getAuth} from "firebase/auth";
import {signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";
import axiosClient from "../utils/axiosClient";
import axios from "axios";


// Google Sign-In
export const doSignInWithGoogle = async () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    googleProvider.setCustomParameters({
        prompt: 'consent'
    });

    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const accessToken = user.accessToken;
        const resultLogin = await axios.post("http://localhost:8080/api/auth/oauth2-login", accessToken);
        return resultLogin;
    } catch (error) {

        throw error;
    }
};

// Facebook Sign-In
export const doSignInWithFacebook = async () => {
    const auth = getAuth();
    const facebookProvider = new FacebookAuthProvider();
    facebookProvider.setCustomParameters({
        prompt: 'consent'
    })
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        const accessToken = user.accessToken;
        const resultLogin = await axios.post("http://localhost:8080/api/auth/oauth2-login", accessToken);
        console.log(resultLogin);
        return resultLogin;
    } catch (error) {
        throw error;
    }
};
