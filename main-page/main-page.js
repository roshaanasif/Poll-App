let currentUser=JSON.parse(localStorage.getItem("currentUser"))||[];
let user=JSON.parse(localStorage.getItem("user"))||[];
let userName=document.getElementById("name");
let logOutBtn=document.getElementById("logoutbtn")
const notyf = new Notyf({
    duration: 1000,
    position: { x: 'right', y: 'top' }
});
let currentperson;
currentUser.forEach(items => {
    currentperson = user.find(item => item.id==items);
    userName.innerHTML=currentperson.username;
});



if(currentUser==""){
    setTimeout(() => {
        location="../authentication/login.html"
    }, 1000);
}

let deletePerson=()=>{
console.log(currentUser);

   let deleteUser =currentUser.filter(item => item.id==currentperson.id);
     
   if(deleteUser != -1){
    currentUser.splice(deleteUser, 1);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    location="../authentication/login.html"
    }else{
        notyf.error("user not found");
    }
    
}
logOutBtn.addEventListener("click",deletePerson)


  


