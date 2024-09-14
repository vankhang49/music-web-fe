
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  // add user to firestore
};

export const doSignInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("User signed in with Facebook:", user);
    // Continue with further processing as needed

  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.email;
      console.log(error);
      alert(error);
      console.log("Email associated with existing account:", email);
      // Handle the situation, e.g., notify the user or link accounts
      alert(`An account with this email already exists. Please use ${email} to sign in with the existing method.`);
    } else {
      // Handle other errors
      alert(error.message);
    }
  }
};
export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
