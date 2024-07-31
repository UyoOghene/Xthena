import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, set, onValue ,remove, update} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
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
  appId: "1:1092271625443:web:4ce3283093f6b0371261d6"
};
const appSettings = {dataBaseURL : "https://xthena-252cd-default-rtdb.firebaseio.com/"};

// Initialize Firebase
const app = initializeApp(firebaseConfig,appSettings);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const user = auth.currentUser;


// Get a reference to the database
const database = getDatabase(app);

// Reference to contactInfo in the database
const contactInfoRef = ref(database, "contactInfo");

// Variables
const adminContainer = document.querySelector('#admin-container');
const googleBtn = document.querySelector('#googleBtn');
const loginContainer = document.querySelector('.login-container');
const inputField = document.querySelector('#input-field');
const inputForm = document.querySelector('#add-btn-field');
const form = document.querySelector('#form');

// Contact details from database
onValue(ref(database, "contactInfo"), (snapshot) => {
    if (snapshot.exists()) {
      const info = snapshot.val();
      adminContainer.innerHTML = '';
      Object.keys(info).forEach(key =>{
          const { name, email, message,date, completed } = info[key];
          const contactBox = document.createElement('div');
          adminContainer.appendChild(contactBox);
          contactBox.setAttribute('id','contactBox');
          const deleteBtn = document.createElement('button');
          contactBox.appendChild(deleteBtn);
          deleteBtn.setAttribute('id','deleteBtn');
          const dateBox = document.createElement('p');
          contactBox.appendChild(dateBox);
          dateBox.setAttribute('id','dateBox');   
          const contactName = document.createElement('h3');
          contactBox.appendChild(contactName);
          contactName.setAttribute('id','contactName');
          const contactMail = document.createElement('p');
          contactBox.appendChild(contactMail);
          contactMail.setAttribute('id','contactMail');
          const contactMsg = document.createElement('p');
          contactBox.appendChild(contactMsg);
          contactMsg.setAttribute('id','contactMsg');
          contactName.textContent = name;
          contactMail.textContent = email;
          contactMsg.textContent = message;
          dateBox.textContent = date;
          deleteBtn.textContent = 'Delete Contact'
          function deleteContact(e){
            let person = prompt("Are you sure you want to delete this?", "yes");
            if (person !== null && person === 'yes'|| person !== null && person === 'Yes' ) {
              console.log('remove')
                const exactLocation = ref(database, `contactInfo/${key}`);
                remove(exactLocation);          
            } else{
                console.log('wait');
            }
          }         
          deleteBtn.addEventListener('click',deleteContact)
      })
    } else {
      adminContainer.innerHTML = 'No items on the list yet';
    }
  });

  function login(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "zino" && password === "zimayoka" ) {
        loginContainer.style.display = 'none';
        adminContainer.style.display = 'flex';
        
    } else {
        alert('Only admins allowed on this page');
    }
}

document.querySelector('#login').addEventListener('click', login);

  
