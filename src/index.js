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
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
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

//* queries:
// const q = query(colRef, where("author", "==", "Constantin Chirita"));
// const q = query(colRef, orderBy("author", "asc"));
const q = query(colRef, orderBy("created_at"));

//! Real time get collection data:
onSnapshot(q, (snapshot) => {
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
    created_at: serverTimestamp(),
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

//* Get a single document:
// Obține o referință la documentul specificat prin ID-ul său în colecția "books"
const docReference = doc(db, "books", "2kmaSKSfaXoObx1B2nfD");

// Folosește funcția getDoc pentru a obține documentul
// TODO getDoc(docReference).then((arg) => console.log(arg.data(), arg.id));
// 'arg' este obiectul DocumentSnapshot returnat de promisiune, conține toate informațiile despre documentul specificat, inclusiv datele sale și ID-ul.

// acum documentul va fi listat in consola ori de cate ori va exista o modificare asupra lui
onSnapshot(docReference, (arg) => {
  console.log(arg);
  console.log(arg.data(), arg.id);
});
