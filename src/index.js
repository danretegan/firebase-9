// inainte:
// import firebase from "firebase/app";
// acum:
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

//* Initialize Firebase:
// inainte:
// firebase.initializeApp(firebaseConfig);
// acum:
initializeApp(firebaseConfig);

//* Initialize Firestore:
const db = getFirestore();
// inainte:
// const db = firebase.firestore();
// db.collection("books");

//* Collection reference:
const colRef = collection(db, "books");

//* Get collection data:
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);
    let books = [];
    snapshot.docs.forEach((elem) => {
      books.push({ ...elem.data(), id: elem.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });
