const emailInput = document.querySelector('#email-input');
const nameInput = document.querySelector('#name-input');
const phoneInput = document.querySelector('#phone-input');
const contactSubmitBtn = document.querySelector('#contactsubmit-btn');


// functions
const storeInput = (e) =>{
    e.preventDefault();
    const phoneVal = phoneInput.value;
    const emailVal = emailInput.value;
    const nameVal = nameInput.value;
    console.log('submit');
    console.log(emailVal)
    emailInput.value = '';
    phoneInput.value = '';
    nameInput.value = '';
}

// Event Listeners
contactSubmitBtn.addEventListener('click',storeInput);