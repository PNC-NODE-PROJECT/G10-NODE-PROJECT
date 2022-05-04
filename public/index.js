function noBack()
{
    window.history.forward();
}
function hidLogin(){
    document.querySelector("#login").style.display = "none";
    document.querySelector("#signup").style.display = "flex";
}

function hidSignup(){
    document.querySelector("#login").style.display = "flex";
    document.querySelector("#signup").style.display = "none";
}

// data validation ==================================
function loginDataValidation(user, password){    
    let userNameError = document.querySelector("#login-username-error");
    let passwordNameError = document.querySelector("#login-password-error");
    
    let nameValid = user === false ? showInputError(userNameError, "Please check you user name!") : showInputError(userNameError, "");
    let passwordValid = password === false ? showInputError(passwordNameError, "Please check you password!") : showInputError(passwordNameError, "");
}

function signUpDataValidation(){
    const emailValidate =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let userName = document.querySelector(".signup-username");
    let userEmail = document.querySelector(".signup-email");
    let userPassword = document.querySelector(".signup-password");

    let userNameError = document.querySelector(".username-error");
    let emailError = document.querySelector(".email-error");
    let passwordNameError = document.querySelector(".password-error");

    let usernameCheck = userName.value === "" ? showInputError(userNameError, "Please check your user name!") : showInputError(userNameError, "");
    let emailCheck = userEmail.value.match(emailValidate) ? showInputError(emailError, "") : showInputError(emailError, "Please check your Email!");
    let passwordCheck = userPassword.value.length < 6 ? showInputError(passwordNameError, "Please check your password!") : showInputError(passwordNameError, "");

    if (usernameCheck && emailCheck && passwordCheck){
        createUser(userName.value, userEmail.value, userPassword.value)
    }
}

// display when data input validation is not correct
function showInputError(input, errorInput){
    input.textContent = errorInput
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
        sessionStorage.setItem("id", userpassword);
        sessionStorage.setItem("email", useremail);
        sessionStorage.setItem("playerName", name);
        location.replace("http://localhost/views/home/home.html")
    })
}

// get all user data from MongoDB
function userLogin(){
    let Name = document.querySelector(".login-username").value;
    let Password = document.querySelector(".login-user-password").value;
    let userCorrect = false;
    let passwordCorrect = false;
    axios.get("/users").then((resporn)=>{
        let allUser = resporn.data
        for(i=0; i<allUser.length; i++){
            if(allUser[i].username==Name){
                userCorrect = true;
            }
            if(allUser[i].password==Password){
                passwordCorrect = true;
            }
            if(userCorrect && passwordCorrect){
                sessionStorage.setItem("email", allUser[i].email);
                var index = i;
            }
        }
        if(userCorrect && passwordCorrect){
            sessionStorage.setItem("id", Password);
            sessionStorage.setItem("playerName", Name);
            sessionStorage.setItem("userid", allUser[index]._id);
            location.replace("http://localhost/views/home/home.html") 
        }else{
            loginDataValidation(userCorrect, passwordCorrect)
        }
    })
}
