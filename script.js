// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// // Environment variables
// window.env = {
//   New_api_key: "AIzaSyCu8mYDdD5P530zXZZoaDJOcG188FQeKPU"
// };

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: window.env.New_api_key,
//   authDomain: "xthena-252cd.firebaseapp.com",
//   projectId: "xthena-252cd",
//   storageBucket: "xthena-252cd.appspot.com",
//   messagingSenderId: "1092271625443",
//   appId: "1:1092271625443:web:4ce3283093f6b0371261d6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get a reference to the database
// const db = getDatabase(app);

// // Reference to contactInfo in the database
// const contactInfoRef = ref(db, "contactInfo");

// const emailInput = document.querySelector('#email-input');
// const nameInput = document.querySelector('#name-input');
// const phoneInput = document.querySelector('#phone-input');
// const contactForm = document.querySelector('#contact-form');
// const contacctsubmitBtn = document.querySelector('#contactsubmit-btn');

// // Functions
// const storeInput = (e) => {
//   e.preventDefault();
//   const emailVal = emailInput.value;
//   const nameVal = nameInput.value;
//   const phoneVal = phoneInput.value;

//   console.log('submit');
//   console.log(emailVal);

//   saveContactInfo(emailVal, nameVal, phoneVal);

//   emailInput.value = '';
//   phoneInput.value = '';
//   nameInput.value = '';
// };

// const saveContactInfo = (email, name, phone) => {
//   const newContactRef = push(contactInfoRef);
//   set(newContactRef, {
//     email: email,
//     name: name,
//     phone: phone
//   });
// };

// // Event Listeners
// contacctsubmitBtn.addEventListener('click', storeInput);
