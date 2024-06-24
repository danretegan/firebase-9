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
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

//* Initialize Firebase:
initializeApp(firebaseConfig);

//! Initialize Firestore:
const db = getFirestore();
const auth = getAuth();

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

//* Updating a document:
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obține o referință la documentul specificat prin ID-ul său în colecția "books"
  const docRef = doc(db, "books", updateForm.id.value);
  // updatare simpla a titlului (putem face un formular de updatare mai complex):
  updateDoc(docRef, {
    title: "UPDATED TITLE",
  }).then(() => {
    updateForm.reset();
  });
});

//* Signing users up:
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created:", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//* Logging in and out:
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("You are logged out!");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in:", cred.user);
      loginForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
