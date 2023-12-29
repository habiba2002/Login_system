var userEmailInputSign = document.getElementById('userEmailInputSign')
var userPassInputSign = document.getElementById('userPassInputSign')

var layer = document.getElementById('layer')
var errorMassageBox = document.getElementById('errorMassageBox')
var redirect = document.getElementById('redirect')

var usersList
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

if (localStorage.getItem('userData') != null) {
    usersList = JSON.parse(localStorage.getItem('userData'))
}
else {
    usersList = []
}

function addUser() {
    var user = {
        email: userEmailInputSign.value,
        pass: userPassInputSign.value
    }
    //////////////////////////////////  Two different ways to check if email is already exsist before //////////////////////////////////////////
    // var result = usersList.filter((user) => user.email == userEmailInputSign.value);
    // console.log(result);
    // if(result.length == 0)
    // {
    //     usersList.push(user)
    //     localStorage.setItem('userData',JSON.stringify(usersList))

    // }
    // else {
    //     console.log("email is already exsist before")
    // }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var emailExsist = []
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email == userEmailInputSign.value) {
            emailExsist.push(usersList[i].email)
        }
    }

    var passwordExsist = []
    for (var i = 0; i < usersList.length; i++) {
       if(usersList[i].pass == userPassInputSign.value){
        passwordExsist.push(usersList[i].pass)
       }
    }

    if (emailExsist.length == 0 && passwordExsist.length == 0 && emailRegex.test(userEmailInputSign.value) == true && passRegex.test(userPassInputSign.value) == true) {
        usersList.push(user)
        localStorage.setItem('userData', JSON.stringify(usersList))
        redirect.setAttribute('href', 'index.html')
    }

    else if (emailExsist.length != 0) {
        layer.classList.remove('d-none')
        errorMassageBox.innerHTML = `<h4 class="fw-bold h4">This Email is aleardy exsist Please choose anthor one</h4>`

    }

    else if (passwordExsist.length !=0){
        layer.classList.remove('d-none')
        errorMassageBox.innerHTML = `<h4 class="fw-bold h4">This password is aleardy exsist Please choose anthor one</h4>`
    }

    else if (emailRegex.test(userEmailInputSign.value) != true && passRegex.test(userPassInputSign.value) == true) {
        layer.classList.remove('d-none')
        errorMassageBox.innerHTML = `<h3 class="fw-bold h3">Error in Email</h3>
        <ul class="w-75 justify-txt">
         <li>Email must contain @ character</li>
        </ul>`
    }
    else if (emailRegex.test(userEmailInputSign.value) == true && passRegex.test(userPassInputSign.value) != true) {
        layer.classList.remove('d-none')
        errorMassageBox.innerHTML = `<h3 class="fw-bold h3">Error in password</h3>
        <ul class="w-75 justify-txt">
         <li>Password must consists of 6-16 characters</li>
         <br>
         <li>Password must contain at least one special character like (! , @ , # , $ , % , ^ , & , *)</li>
         <br>
         <li>Password must contain at least one number</li>
        </ul>`
    }
    else if (emailRegex.test(userEmailInputSign.value) != true && passRegex.test(userPassInputSign.value) != true) {
        layer.classList.remove('d-none')
        errorMassageBox.innerHTML = `<h3 class="fw-bold h3">Error in password and Email</h3>
        <ul class="w-75 justify-txt">
         <li>Password must consists of 6-16 characters</li>
         <br>
         <li>Password must contain at least one special character like (! , @ , # , $ , % , ^ , & , *)</li>
         <br>
         <li>Password must contain at least one number</li>
         <br>
         <li>Email must contain @ character</li>
        </ul>`
    }

}

function clearInputs() {
    document.getElementById("registrationForm").reset();
}

function closeModel() {
    layer.classList.add('d-none')
}

function registration() {
    addUser()
    clearInputs()
}



var userEmailInput = document.getElementById("userEmailInput")
var userpassInput = document.getElementById("userpassInput")
var loginUsers

if (localStorage.getItem('login') != null) {
    loginUsers = JSON.parse(localStorage.getItem('login'))
}
else {
    loginUsers = []
}

function login() {
    var loginuser = {
        email: userEmailInput.value,
        pass: userpassInput.value
    }

    var result = usersList.filter((user) => user.email == userEmailInput.value && user.pass == userpassInput.value)
    var emailError = usersList.filter((user) => user.email != userEmailInput.value && user.pass == userpassInput.value)
    var passwordError = usersList.filter((user) => user.email == userEmailInput.value && user.pass != userpassInput.value)

    if (result.length != 0) {
        var redirectHome = document.getElementById('redirectHome')
        redirectHome.setAttribute('href', 'home.html')
        loginUsers.push(loginuser)
        localStorage.setItem('login',JSON.stringify(loginUsers))
    }
    else if (emailError.length != 0) {
        layer.classList.remove('d-none')
        errorMassageBox.innerHTML = `<h4 class="fw-bold h4"> This email don't match with this password <br> Please re-enter your email</h4>`
    }
    else if (passwordError.length != 0) {
        layer.classList.remove('d-none')
        errorMassageBox.innerHTML = `<h4 class="fw-bold h4"> This password don't match with this email <br> Please re-enter your password</h4>`
    }
    else {
        layer.classList.remove('d-none')
        errorMassageBox.innerHTML = `<h4 class="fw-bold h3">Email and password aren't exsists <br> You don't have an account </h4>`
    }

}


document.getElementById("homeOwner").innerHTML = loginUsers[loginUsers.length-1].email







