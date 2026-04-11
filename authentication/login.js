let username=document.getElementById("username");
let password=document.getElementById("Password");
let loginBtn=document.getElementById("loginbtn")

const notyf = new Notyf({
    duration: 1000,
    position: { x: 'right', y: 'top' }
});

function findPerson(){
    let userinfo = JSON.parse(localStorage.getItem("user")) || [];
    console.log(userinfo);
    let found=false;
   
    let currentUser=[];
    if(username.value && password.value){
        if(password.value.length<6){
            notyf.error("Password must be of 6 letters");
            password.value="";
            return
        }

        userinfo.forEach( user => {
            console.log("text");
            
            if((user.username==username.value || user.email==username.value) && user.password==password.value){
                notyf.success("Sign In successful");
                currentUser.push(user.id);
                localStorage.setItem("currentUser",JSON.stringify(currentUser));    
                username.value="";
                password.value="";
                found=true;
            }    
        } 
        );

        if(!found){
            notyf.error("Please Sign Up,you don't have an account");
            username.value="";
            password.value="";
        
            setTimeout(()=> {
                location = "signup.html";
            }, 1000);

        }else{
            location= "/main-page/main-page.html";
        }

    }else{
        notyf.error("Please Fill All Fields")
    }   


}

loginBtn.addEventListener("click",findPerson)
