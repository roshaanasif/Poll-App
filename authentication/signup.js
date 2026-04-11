let username=document.getElementById("username");
let email=document.getElementById("email");
let password=document.getElementById("Password");
let confirmPassword=document.getElementById("Confirm-Password");
let signupButton=document.getElementById("signup-button")
const notyf = new Notyf({
    duration: 4000,
    position: { x: 'right', y: 'top' }
  });
const emailRegex = /^[a-zA-Z0-9]+([._+-]?[a-zA-Z0-9]+)*@(gmail|yahoo|outlook)\.com$/;
const passwordRegex = /^(?!.*(?:012|123|234|345|456|567|678|789|890))(?=.{6,}).*$/;
// let savingInfo=[];
let isUsernameExist=false;


function findingExistingInfo(name,gmail,password){
    let savingdata = JSON.parse(localStorage.getItem("user")) || [];
    console.log(savingdata);
    
    for (let person of savingdata){
        if(person.username==name){
            if(person.email==gmail){
                if(person.password==password){
                        notyf.error(`You have an account please Sign In`);
                        clearInputs();
                        return true
                    }  
            notyf.error("Gmail Exists Please Sign In");
            clearInputs();
            return true
            }
        notyf.error("Username Exists Already");
        username.value="";
        isUsernameExist=true;
        return true
        }    
         
    }

    return false
    }

let savingInfo = JSON.parse(localStorage.getItem("user")) || [];
function savingcredential(){
    isUsernameExist = false;
    const singlePerson={};
    if(username.value.trim() && email.value.trim() && password.value.trim() && confirmPassword.value.trim()){
      
       const exists = findingExistingInfo(username.value.trim(),email.value.trim(),password.value.trim());
       if (exists ) {
           return; 
       }

       singlePerson.username=username.value.trim();
      
       if (emailRegex.test(email.value.trim())){
           singlePerson.email=email.value.trim();
       }else{
        notyf.error("invalid email");
        email.value="";
        return
       }

       if(password.value == confirmPassword.value){
            if(passwordRegex.test(password.value)){
                singlePerson.password=password.value;
                console.log(singlePerson);
            }else{
                notyf.error("Invalid password");
                password.value="";
                confirmPassword.value="";
                return
            }
        }else{
            notyf.error("password doesn't match")
            password.value="";
            confirmPassword.value="";
            return
        }
        singlePerson.id=Date.now(); 
       
    }else{
        notyf.error('Please fill out all fields.');
        return
    }

    savingInfo.push(singlePerson);
    localStorage.setItem("user", JSON.stringify(savingInfo));
    notyf.success("Signup successful");
    clearInputs();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);


  
}
function clearInputs() {
    username.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
  }
  

