let pollOptions=document.getElementById("poll-options");
let addOptionBtn=document.getElementById("addOptionBtn");
let pollTitle=document.getElementById("pollTitle");
let deleteBtn=document.getElementById("deleteBtn");
let option=document.getElementById("option");
let createPoll=document.getElementById("createPoll");
let pollDescription=document.getElementById("polldescription")
let currentUser=JSON.parse(localStorage.getItem("currentUser"))||[];
let currentPersonId;
currentUser.forEach(item => {
     currentPersonId=item;
});



const notyf = new Notyf({
    duration: 1000,
    position: { x: 'right', y: 'top' }
});
let optionCount=0;
let savingoptions=[]
let isFirstOption=true;
let currentinput;

//add options 
let addOption=(e)=>{
    e.preventDefault()
    let titleValue=pollTitle.value;

    if(titleValue.trim()){
        if(optionCount>=4){    
        notyf.error("you have only 4 options to add")
        return
        }
        if(isFirstOption){
            optionCount++; 
            const div=document.createElement("div");
            div.classList="flex items-center my-2"             
            div.innerHTML +=` 
               
                <div
                    class="border-1 border-gray-200 px-4 py-2 h-10 bg-gray-100 rounded-l-lg text-gray-500 text-sm flex justify-center items-center">
                    <span>${optionCount}</span>
                </div>
                <input id="option${optionCount}" required type="text" placeholder="Option ${optionCount}"
                    class="px-4 py-2 border-1 border-t-gray-300 border-l-0 border-r-0 border-b-gray-300 w-full focus:outline-blue-500 placeholder:text-sm placeholder:text-gray-400">
                <button
                    id="deleteBtn" data-id="${optionCount}" class="border-1 border-gray-200 cursor-pointer px-4 py-2 h-10 text-red-400  bg-red-50 hover:bg-red-100 rounded-r-lg  text-sm flex justify-center items-center">
                    <i class="fa-solid fa-xmark"></i>
                </button>
          
                    `
            pollOptions.appendChild(div)
        isFirstOption=false;
        }else{   
        currentinput=document.getElementById(`option${optionCount}`);
            if(currentinput && currentinput.value){
                 optionCount++
            const div=document.createElement("div");
            div.classList="flex items-center my-2"             
            div.innerHTML +=`  
                <div
                    class="border-1 border-gray-200 px-4 h-8 bg-gray-100 rounded-l-lg text-gray-500 text-sm flex justify-center items-center">
                    <span>${optionCount}</span>
                </div>
                <input id="option${optionCount}" required type="text" placeholder="Option ${optionCount}"
                    class="px-4 py-2 border-1 border-t-gray-300 border-l-0 border-r-0 border-b-gray-300 w-full focus:outline-blue-500 placeholder:text-sm placeholder:text-gray-400">
                <button
                    id="deleteBtn" data-id="${optionCount}" class="border-1 border-gray-200 cursor-pointer px-2 h-8 text-red-400  bg-red-50 hover:bg-red-100 rounded-r-lg  text-sm flex justify-center items-center">
                    <i class="fa-solid fa-xmark"></i>
                </button>
         
                    `
            pollOptions.appendChild(div)
            
            }else{
                notyf.error("enter option feild first ")
            }
        }
    }else{
        notyf.error("please enter title first")
    }


}
addOptionBtn.addEventListener("click",addOption);
let savinginputs;
let gettingAllInputs = () => {
    savingoptions = [];
    const inputs = document.querySelectorAll('input[id^="option"]');

    inputs.forEach(input => {
        const value = input.value.trim();
        if(value){
            let option={
                optionvalue:value,
                optionVotes:0
            }
            savingoptions.push(option);
        }
    });

    const hasEmpty = savingoptions.some(val => val === "");

    if (hasEmpty) {
        savingoptions = [];
        notyf.error("Fill out all fields");
        return;
    }

    return savingoptions;
};

// let gettingAllInputs=()=>{
//     savingoptions=[]
//     const inputs = document.querySelectorAll('input[id^="option"]');

//     inputs.forEach(input => {
//         const value = input.value.trim();
//         if (value) {
//             savingoptions.push(value);
//         }  

//         if (savinginputs!=savingoptions) {
//             savingoptions=[]
//             notyf.error("error of empty feild")
//             return
//     }

//     }); 

  
//     return savingoptions
    

// }

//delete function
let deleteOption=(e)=>{
    e.preventDefault()

    gettingAllInputs();

    let id;
    if(e.target.matches("#deleteBtn")){
        id = e.target.getAttribute("data-id");
       
        if (savingoptions.length <= 2) {
            let popUp=document.getElementById("error");
            popUp.classList.remove("hidden")
            setTimeout(() => {
                popUp.classList.toggle("flex")
                popUp.classList.add("hidden")
            },2000);
            // notyf.error("At least two options are required.");
            return;
        }
        
        if(savingoptions.length>=2){
            savingoptions.splice(id-1,1);
            pollOptions.innerHTML="";
            optionCount=0;

            savingoptions.forEach((value) => {
                 optionCount++;
                 const div = document.createElement("div");
                 div.className = "flex items-center my-2";
     
                 div.innerHTML = `
                     <div class="border-1 border-gray-200 px-4 h-8 bg-gray-100 rounded-l-lg text-gray-500 text-sm flex justify-center items-center">
                         <span class="option-number">${optionCount}</span>
                     </div>
                     <input id="option${optionCount}" required type="text" value="${value}" placeholder="Option ${optionCount}"
                         class="px-4 py-2 border-1 border-t-gray-300 border-l-0 border-r-0 border-b-gray-300 w-full focus:outline-blue-500 placeholder:text-sm placeholder:text-gray-400">
                     <button id="deleteBtn" data-id="${optionCount}" class="border-1 border-gray-200 cursor-pointer px-2 h-8 text-red-400 bg-red-50 hover:bg-red-100 rounded-r-lg text-sm flex justify-center items-center">
                         <i class="fa-solid fa-xmark"></i>
                     </button>
                 `;
             
                 pollOptions.appendChild(div)
             })
        }

            
        }


    }  

pollOptions.addEventListener("click",deleteOption);

const now = new Date();

let pollTotalVotes=0

class poll{
    constructor(pollTitle,pollDescription,pollOptions,timestamp,userId,pollId,pollvotes){
     this.pollTitle=pollTitle;
     this.pollDescription=pollDescription;
     this.pollOptions=pollOptions;
     this.timestamp=timestamp;
     this.userId=userId;
     this.pollId=pollId;
     this.pollvotes=pollvotes;
    }
}


let getData=JSON.parse(localStorage.getItem("polls"))||[];
// let getData=[];
let pollCreation=()=>{
   
    gettingAllInputs();
   if(savingoptions.length<2 ){
        notyf.error("Atleast two Options Required")
        return
    }
    
    const pollInfo=new poll(pollTitle.value,pollDescription.value,gettingAllInputs(),now.toDateString(),currentPersonId,Date.now(),pollTotalVotes);
    getData.unshift(pollInfo);


    localStorage.setItem("polls",JSON.stringify(getData))
    
    notyf.success("poll created !!!")


    setTimeout(() => {
        location="../poll-display/all-polls/All-polls.html"
    }, 500);
}
createPoll.addEventListener("click",pollCreation);




