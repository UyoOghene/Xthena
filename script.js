
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Environment variables
window.env = {
  New_api_key: "AIzaSyCu8mYDdD5P530zXZZoaDJOcG188FQeKPU"
};

// Firebase configuration
const firebaseConfig = {
  apiKey: window.env.New_api_key,
  authDomain: "xthena-252cd.firebaseapp.com",
  projectId: "xthena-252cd",
  storageBucket: "xthena-252cd.appspot.com",
  messagingSenderId: "1092271625443",
  appId: "1:1092271625443:web:4ce3283093f6b0371261d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const db = getDatabase(app);

// Reference to contactInfo in the database
const contactInfoRef = ref(db, "contactInfo");

// Variables
const emailInput = document.querySelector('#email-input');
const nameInput = document.querySelector('#name-input');
const messageInput = document.querySelector('#phone-input');
const contactForm = document.querySelector('#contact-form');
const contactSubmitBtn = document.querySelector('#contactsubmit-btn');
const servicesLink = document.querySelector('#services-a');

// Functions

function showToast(){
  Toastify({
    text: "Submit Successful!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  
}

const storeInput = (e) => {
  e.preventDefault();
  showToast();
  const emailVal = emailInput.value;
  const nameVal = nameInput.value;
  const messageVal = messageInput.value;
  console.log('submit');
  console.log(emailVal);
  saveContactInfo(emailVal, nameVal, messageVal);
  emailInput.value = '';
  messageInput.value = '';
  nameInput.value = '';
};

const saveContactInfo = (email, name, message) => {
  const d = new Date();
  const date = d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const newContactRef = push(contactInfoRef);
  set(newContactRef, {
    email: email,
    name: name,
    message: message,
    date: date,
  });
};


// Event Listeners
contactSubmitBtn.addEventListener('click', storeInput);

