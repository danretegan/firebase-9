// inainte:
// import firebase from "firebase/app";
// acum:
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

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

//! Real time get collection data:
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((elem) => {
    books.push({ ...elem.data(), id: elem.id });
  });
  console.log(books);
});

//* adding documents:
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

//* deleting documents:
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    console.log(
      `The book with id: ${deleteBookForm.id.value} was successfully deleted!`
    );
    deleteBookForm.reset();
  });
});
