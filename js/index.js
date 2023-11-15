const Bookname1 = document.getElementById('bookname');
const emailEl = document.getElementById('email');
const authorname1 = document.getElementById('authorname');
const department=document.getElementById('dept');
const bookprice=document.getElementById('price');
const PublishedDate=document.getElementById('publisheddate');

const resultDiv = document.getElementById("result");

const form = document.getElementById('signup');


const checkDepartment =() =>{
    let valid=false;
    const selectOptions=department.value;
    console.log(selectOptions);
    if(selectOptions=="") {
        showError(department,'select any departments');
    }
    else {
        valid=true;
    }
    return valid;
}

const checkBookname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const bookname =Bookname1.value.trim();
    var hasnumbers=/\d/.test(bookname);

    if (isRequired(bookname)) {
        showError( Bookname1 , 'bookname cannot be blank.');
    } 
    else if(hasnumbers) {
        showError( Bookname1 ,"Numeric values not allowed");
    }
    else if (!isBetween(bookname.length, min, max)) {
        showError( Bookname1 , `bookname must be between ${min} and ${max} characters.`)
    }
 else {
        showSuccess( Bookname1 );
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const checkAuthorName=() =>{
    let valid=false;

    const min=3, max=23;

    const authorname=authorname1.value.trim();
    let hasnumbers=/\d/.test(authorname);

    if(isRequired(authorname)){
        showError(authorname1,'author name cannot be empty');
    }

    else if(hasnumbers){
        showError( authorname1 ,"Numeric values not allowed");
    }
    else if(!isBetween(authorname.length,min,max)){
        showError(authorname1,`authorname must be between ${min} and ${max} characters.`)
    }
    else {
        showSuccess(authorname1);
        valid=true;
    }
    return valid;
}

const checkPrice=() =>{
    const price=bookprice.value;
    let valid=false;
    let haslpha=/[a-zA-Z]/.test(price);
    if(haslpha){
        showError( bookprice ,"alpha values not allowed");
    }
    else{
        showSuccess(bookprice);
        valid=true;
    }
    return valid;
}

const checkPublishedDate= () =>{
    let valid=false;
    var currentDate = new Date();
    var dateInput = new Date(PublishedDate.value);
            if (dateInput > currentDate) {
                showError(PublishedDate,'Invalid date the date cannot be exceed than the current date');
            } else if (dateInput < currentDate) {
                showSuccess(PublishedDate);
                valid=true;
                
            } else {
                showError(PublishedDate,'Invalid date the date you entered is the current date');
}
return valid;
}

const isRequired = value => value === '' ? true : false;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {

    const formField = input.parentElement;
    const error = formField.querySelector('small');
    error.textContent = message;
    input.style.border='2px solid red';
    error.style.color='red';
};

const showSuccess = (input) => {

    const formField = input.parentElement;
    const error = formField.querySelector('small');
    error.textContent = '';
    input.style.border='2px solid green';
}



 form.addEventListener('submit', function (e) {

    e.preventDefault();

    let isBooknameValid = checkBookname(),
        isEmailValid = checkEmail(),
        isAuthornameValid = checkAuthorName();
        isPublishedDateValid=checkPublishedDate();
        isPrice=checkPrice();

    let isFormValid = isBooknameValid &&
        isEmailValid &&
        isPublishedDateValid &&
        isAuthornameValid && isPrice;

        var input = {
            "category": department,
            "bookname": Bookname1,
            "name": authorname1,
            "mail": emailEl,
            "published": PublishedDate,
            "price": bookprice
        };
     

    if (isFormValid) {
        localStorage.setItem("category", input.category.value);
        localStorage.setItem("bookname", input.bookname.value);
        localStorage.setItem("name", input.name.value);
        localStorage.setItem("mail", input.mail.value);
        localStorage.setItem("published", input.published.value);
        localStorage.setItem("price", input.price.value);
    }
    // else {
    //     alert("some values are missing");
    // }
});

function clearValues(){
    Bookname1.value='';
    emailEl.value='';
    authorname1.value='';
    department.value='';
    bookprice.value='';
    PublishedDate.value=''



}

form.addEventListener('input', function (e) {
    switch (e.target.id) {

        case 'dept':
            checkDepartment();
            break;
        case 'bookname':
            checkBookname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'authorname':
            checkAuthorName();
            break;
        case 'publisheddate':
            checkPublishedDate();
            break;
        case 'price':
            checkPrice();
            break;
    }
});