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

const adminContainer = document.querySelector('#admin-container');
const googleBtn = document.querySelector('#googleBtn');
const loginContainer = document.querySelector('.login-container');
const inputField = document.querySelector('#input-field');
const inputForm = document.querySelector('#add-btn-field');
const form = document.querySelector('#form');




onValue(ref(database, "contactInfo"), (snapshot) => {

    if (snapshot.exists()) {
      const info = snapshot.val();
      adminContainer.innerHTML = '';
      const table = document.createElement('table');
      table.setAttribute('border', '1');
      table.setAttribute('id', 'table');
      adminContainer.appendChild(table);
      const headerRow = document.createElement('tr');
      headerRow.setAttribute('id', 'headerRow');
  
      const headers = ['name', 'email', 'message','date'];
      headers.forEach(headerText => {
        const th = document.createElement('th');
        th.setAttribute('id', 'th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);
  
      Object.keys(info).forEach(key => {
        const { name, email, message,date, completed } = info[key];
        const row = document.createElement('tr');
        row.setAttribute('id', 'row');
        table.appendChild(row);
  
        [name, email, message,date].forEach(text => {
          const td = document.createElement('td');
          td.setAttribute('id', 'td');
          td.textContent = text;
          row.appendChild(td);
        });
  
        if (completed) {
          row.style.textDecoration = 'line-through';
        //   row.style.backgroundColor = 'red';
        }
  
        row.addEventListener('click', () => {
          const exactLocation = ref(database, `contactInfo/${key}`);

          update(exactLocation, { completed: !completed });
        });
  
        row.addEventListener('dblclick', () => {
          const exactLocation = ref(database, `contactInfo/${key}`);
          remove(exactLocation);
        });
      });
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

  
