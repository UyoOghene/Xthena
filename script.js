
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


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
  appId: "1:1092271625443:web:4ce3283093f6b0371261d6",
  databaseURL: "https://xthena-252cd-default-rtdb.firebaseio.com/",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const db = getDatabase(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const user = auth.currentUser;



// Reference to contactInfo in the database
const contactInfoRef = ref(db, "contactInfo");

// Variables
const googleBtn = document.querySelector('#googleBtn');
const loginContainer = document.querySelector('.login-container');
const emailInput = document.querySelector('#email-input');
const nameInput = document.querySelector('#name-input');
const messageInput = document.querySelector('#phone-input');
const contactForm = document.querySelector('#contact-form');
const contact = document.querySelector('#contact');
const showcase = document.querySelector('#showcase');
const profession = document.querySelector('#profession');
const slogan = document.querySelector('#slogan');
const serviceSect = document.querySelector('#service-section');
const navBar = document.querySelector('#navbar');
const contactSubmitBtn = document.querySelector('#contactsubmit-btn');
const servicesLink = document.querySelector('#services-a');
const navToggle = document.querySelector('.nav-toggle');
const navUl = document.querySelector('header nav ul');

// Functions

const onGoogleLogin = () => {
  const user = auth.currentUser;
  if (user) {
      console.log(user.email); 
      window.location.href = './home.html'; 
  }
};

googleBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
      .then((result) => {
          const user = result.user;
          console.log(user);
          console.log('googlebtn');
          localStorage.setItem('email', user.email);
          localStorage.setItem('userStore', JSON.stringify(user));
          localStorage.setItem('pic', user.photoURL);
          loginContainer.style.display = 'none';
          onGoogleLogin();
      })
      .catch((error) => {
          console.error(error.code, error.message);
      });
});

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

// Responsive navbar
navToggle.addEventListener('click', function() {
    navUl.classList.toggle('show');
});
navToggle.addEventListener('mouseover', function() {
  navUl.classList.add('show');
});

navToggle.addEventListener('mouseout', function() {
  navUl.classList.remove('show');
});

navUl.addEventListener('mouseover', function() {
  navUl.classList.add('show');
});

navUl.addEventListener('mouseout', function() {
  navUl.classList.remove('show');
});


// Event Listeners
contactSubmitBtn.addEventListener('click', storeInput);