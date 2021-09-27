import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBShFaIgxOFhTItVIdSRM6ITU_z67AJjG8",
  authDomain: "ecom-96588.firebaseapp.com",
  projectId: "ecom-96588",
  storageBucket: "ecom-96588.appspot.com",
  messagingSenderId: "962310494990",
  appId: "1:962310494990:web:11c4384c64966e3b4c955f",
  measurementId: "G-L9GKGQ2VDF",
};

const app = initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvide = new firebase.auth.googleAuthProvide();
