function hidLogin(){
    document.querySelector("#login").style.display = "none";
    document.querySelector("#signup").style.display = "flex";
}

function hidSignup(){
    document.querySelector("#login").style.display = "flex";
    document.querySelector("#signup").style.display = "none";
}

// data validation ===================================

function loginDataValidation(){
    let userName = document.querySelector(".login-username");
    let userPassword = document.querySelector(".login-user-password");
    
    let userNameError = document.querySelector("#login-username-error");
    let passwordNameError = document.querySelector("#login-password-error");
    
    let nameValid = userName.value === "" ? showInputError(userNameError, "Please check you user name!") : showInputError(userNameError, "");
    let passwordValid = userPassword.value === "" ? showInputError(passwordNameError, "Please check you password!") : showInputError(passwordNameError, "");
    if(nameValid && passwordValid){
        userLogin();
    }else{
        alert("login fail")
    }
}

function signUpDataValidation(){
    const emailValidate =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let userName = document.querySelector(".signup-username");
    let userEmail = document.querySelector(".signup-email");
    let userPassword = document.querySelector(".signup-password");

    let userNameError = document.querySelector(".username-error");
    let emailError = document.querySelector(".email-error");
    let passwordNameError = document.querySelector(".password-error");

    let usernameCheck = userName.value === "" ? showInputError(userNameError, "Please check you user name!") : showInputError(userNameError, "");
    let emailCheck = userEmail.value.match(emailValidate) ? showInputError(emailError, "") : showInputError(emailError, "Please check you user name!");
    let passwordCheck = userPassword.value.length < 6 ? showInputError(passwordNameError, "Please check you password!") : showInputError(passwordNameError, "");

    if (usernameCheck && emailCheck && passwordCheck){
        createUser(userName.value, userEmail.value, userPassword.value)
        console.log(userPassword.value);
    }
}

// display when data input validation is not correct
function showInputError(input, errorInput){
    input.textContent = errorInput
    console.log(errorInput);
    if (errorInput.length < 1){
        return true;
    }else{
        return false;
    }
}

// add data user create account into database
function createUser(name, useremail, userpassword){
    let data = {username:name, email: useremail, password: userpassword}
    axios.post("/users", data).then((resporn)=>{
        console.log(resporn);
    })
}

// get all user data from MongoDB
function userLogin(){
    let Name = document.querySelector(".login-username").value;
    let Password = document.querySelector(".login-user-password").value;
    let condition = false;
    axios.get("/users").then((resporn)=>{
        let allUser = resporn.data
        console.log(allUser);
        for(i=0; i<allUser.length; i++){
            console.log(allUser[i]);
            if(allUser[i].username==Name && allUser[i].password==Password){
                condition = true;
            }
        }
        if(condition){
            alert("login Success");
            console.log("login Success");   
        }
    })
}