let getData=JSON.parse(localStorage.getItem("polls"))||[];
let currentUser=JSON.parse(localStorage.getItem("currentUser"))||[];
let main=document.getElementById("main-div");
let userPolls;
const notyf = new Notyf({
    duration: 1000,
    position: { x: 'right', y: 'top' }
});
currentUser.forEach(userid => {
    userPolls=getData.filter(item=>item.userId==userid);
});
console.log(userPolls);

if(userPolls.length==0){
        main.innerHTML+=` <p class="text-xl mt-20 w-full justify-center font-semibold items-center text-gray-600 font-serif flex "><span class="font-bold font-sans"><i class="fa-solid fa-plus mr-2"></i></span>Create polls to show</p>`
}

userPolls.forEach(items=>{
    main.innerHTML+=`
            <div class="flex flex-col shadow-md h-auto py-4 px-8 mt-6 rounded-md justify-start bg-white  border-gray-200 border-2 ">
            <div class="w-full flex justify-between items-center">
                <div id="polltitle" class="w-full text-xl font-bold">${items.pollTitle}</div>
                <div class="poll-actions flex items-center gap-4">
                <i data-id="${items.pollId}" class="deletepoll fa-regular text-xl hover:text-red-600 fa-trash-can"></i>
                <i data-id="${items.pollId}" class="editpoll fa-regular text-xl hover:text-green-600 fa-pen-to-square"></i>
                </div>
                </div>

                <div id="pollDescription" class="w-full text-lg font-semibold text-gray-500">
                ${items.pollDescription}
                </div>
            
            <div class="flex md:flex-row flex-col items-start gap-4 mt-3">
                <div class="flex gap-2 justify-center items-center">
                    <i class="fa-solid text-gray-500 fa-calendar-check"></i>
                    <span id="date" class="text-base font-semibold">${items.timestamp}</span>
                </div>
                <div class="flex gap-2 justify-center items-center">
                    <i class="fa-solid text-blue-500 fa-users"></i>
                    <p  class="text-base font-semibold">${items.pollvotes}<span> votes</span></>
                    
                </div>
                <div class="flex gap-2 justify-center items-center">
                    <i class="fa-solid fa-tag text-green-500"></i>
                    <p  class="text-base font-semibold">${items.pollOptions.length}<span> Options</span></>
                </div>
            </div>

             <ul class="w-full flex flex-col md:flex-row  gap-6 mt-8" >
                 ${items.pollOptions.map(item => `
                <div class="flex-1 bg-blue-100 text-blue-500 font-semibold w-full h-auto min-w-15 min-h-5 flex justify-between items-center py-2 px-4 rounded-sm " >
                <li class="">
                ${item.optionvalue}
                </li>
                <p class="text-xs  text-gray-500 font-semibold">Votes<span> ${item.optionVotes}</span></>
                </div>

            `).join('')}   
             </ul>

        
             
             </div>`
             // <a data-id="${items.pollId}" class="votebtn hover:cursor-pointer mt-8 md:mt-6 md:w-30 w-full sm:my-4 px-3  text-md text-center font-semibold text-black py-2 bg-gradient-to-r from-blue-100 to-blue-400 hover:bg-gradient-to-l  rounded-md ">See Votes</a>
            })
            
            
let screenOverlay=document.getElementById("screenOverlay");
let editScreenOverlay=document.getElementById("editscreenoverlay");
// showing delete popup
let showDeletePopup=(id)=>{
    screenOverlay.innerHTML=` <div class="relative p-4 w-full max-w-md">
        <!-- Modal content -->
        <div  class="relative p-4 text-center bg-gray-100 rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button id="cross" type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <svg class="text-blue-500 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <p class="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this poll ?</p>
            <div class="flex justify-center items-center space-x-4">
                <button id="cancelbtn" class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    No, cancel
                </button>
                <button type="button" data-id="${id}" id="deletebtn" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                    Yes, I'm sure
                </button>
            </div>
        </div>
    </div>`
     screenOverlay.classList.remove("hidden");
    screenOverlay.classList.add("flex");
    
}

// delete poll
let deletepoll=(pollid)=>{
 
    let pollIndex=getData.findIndex(poll => poll.pollId==pollid);
    getData.splice(pollIndex,1);
    localStorage.setItem("polls",JSON.stringify(getData));

    screenOverlay.classList.add("hidden");
    screenOverlay.classList.remove("flex");
    
    let afterdelete=JSON.parse(localStorage.getItem("polls"))||[];
    console.log(afterdelete);
    
    currentUser.forEach(userid => {   
    userPolls=afterdelete.filter(item=>item.userId==userid); 
});
if(userPolls.length>0){
     main.innerHTML=""
    userPolls.forEach(items=>{
    main.innerHTML+=`
            <div class="flex flex-col shadow-md h-auto py-4 px-8 mt-6 rounded-md justify-start bg-white  border-gray-200 border-2 ">
            <div class="w-full flex justify-between items-center">
                <span id="polltitle" class="text-xl font-bold">${items.pollTitle}</span>
              <div class="poll-actions flex items-center gap-4">
                    <i data-id="${items.pollId}" class="deletepoll fa-regular text-xl hover:text-red-600 fa-trash-can"></i>
                    <i data-id="${items.pollId}" class="editpoll fa-regular text-xl hover:text-green-600 fa-pen-to-square"></i>
                </div>
            </div>
            
            <div class="flex md:flex-row flex-col items-start gap-4 mt-3">
                <div class="flex gap-2 justify-center items-center">
                    <i class="fa-solid text-gray-500 fa-calendar-check"></i>
                    <span id="date" class="text-base font-semibold">${items.timestamp}</span>
                </div>
                <div class="flex gap-2 justify-center items-center">
                    <i class="fa-solid text-blue-500 fa-users"></i>
                    <p  class="text-base font-semibold">0<span> votes</span></>
                    
                </div>
                <div class="flex gap-2 justify-center items-center">
                    <i class="fa-solid fa-tag text-green-500"></i>
                    <p  class="text-base font-semibold">${items.pollOptions.length}<span> Options</span></>
                </div>
            </div>

             <ul class="full flex flex-col md:flex-row  gap-2 mt-8" >
                 ${items.pollOptions.map(item => `
                <li class="flex-1 bg-blue-100 text-blue-500 font-semibold w-full h-auto min-w-15 min-h-5 flex justify-center items-center py-2 px-4 rounded-sm ">
                ${item}
                </li>
            `).join('')}   
             </ul>

        
            <a data-id="${items.pollId}" class="votebtn hover:cursor-pointer mt-8 md:mt-6 md:w-30 w-full sm:my-4 px-3  text-md text-center font-semibold text-black py-2 bg-gradient-to-r from-blue-100 to-blue-400 hover:bg-gradient-to-l  rounded-md ">Vote Now</a>
          
            </div>`
})
}else{
 main.innerHTML+=` <p class="text-xl mt-20 w-full justify-center font-semibold items-center text-gray-600 font-serif flex "><span class="font-bold font-sans"><i class="fa-solid fa-plus mr-2"></i></span>Create polls to show</p>`
 
}

}

 
// showing edit popup 
let WantToEditpoll;
let gettingpoll;
let showeditPollPopUp=(id)=>{
    
let gettingpolloptions;
gettingpoll=getData.find(item=>item.pollId==id);


editScreenOverlay.innerHTML=`  <div class=" bg-white w-9/12 px-6 py-2 h-auto shadow-lg  rounded-md ">
    <div class="flex px-6 py-2 justify-between w-full items-center">
    <div class="flex-1">
    <span class="text-4xl text-blue-600 font-bold">Edit Poll</span>
    </div>
    
    <div class="flex-1 flex justify-end">
    <a id="back" class="hover:cursor-pointer w-2/12 m-4 px-3 text-md text-center font-semibold text-black py-2 bg-gradient-to-r from-stone-200 to-gray-300 hover:bg-gradient-to-l  rounded-md ">Back</a>
    </div>
    </div> 
        
    <form class="w-full h-auto mt-6 px-6 py-2" action="">
    <div class="flex items-start">
    <div class="flex-1 flex flex-col gap-3 ">
    <label class="text-black text-lg font-semibold" for="title">Poll Title</label>
    <input class="bg-transparent border-gray-200 border-2 w-full rounded-sm " id="pollTitle" type="text" value="${gettingpoll.pollTitle}" placeholder="Enter Poll Title">
    </div>

    
        <div class="flex-1 flex ml-6 flex-col gap-3">
        <label class="text-black text-lg font-semibold"  for="Description">Description<span class="text-gray-400 ml-2">(optional)</span></label>
        <input class="bg-transparent border-gray-200 border-2 w-full rounded-sm" id="polldescription" type="text" placeholder="Enter Poll Description" value="${gettingpoll.pollDescription}">
        </div>
        </div>
        
        <div class="flex justify-start w-full flex-col">
        <div class="flex justify-between items-center mt-8">
        <span class="text-lg font-semibold">Poll Options</span>
        </div>
        <div id="poll-options" class=" flex flex-col w-full mt-4">
        ${gettingpolloptions =gettingpoll.pollOptions.map((option, index) => `
            <div class="flex items-center gap-1 mb-2 ">
            <button class=" w-15 py-2 h-auto rounded-sm bg-blue-200 remove-option-btn text-blue-500 font-bold hover:text-blue-700" >${index+1}</button>
            <input type="text" class="bg-transparent border-gray-200 border-2 w-full rounded-sm poll-option-input" placeholder="Enter Option" value="${option.optionvalue}" id="option${index+1}">
            <div class="flex justify-center items-center">
            <i data-id="${index+1}" class="w-10 py-2 h-auto rounded-sm deletepolloption fa-regular text-xl text-center text-white bg-red-500 hover:bg-red-100 hover:text-red-600 fa-trash-can"></i>
            </div>
            </div>
            `).join("")}
            </div>
            
            <button type="button" href=""  data-id="${id}"  class=" border-gray-200 cursor-pointer px-2 h-10 rounded-sm w-full text-black  bg-blue-100 hover:bg-blue-200 rounded-r-lg  text-lg font-semibold flex justify-center items-center" id="addOptionBtn">Add Option</button>
            </div>
            </form>
            
            <div class="w-full flex my-8 gap-6 justify-end">
            <a type="button"  class=" border-gray-200 cursor-pointer px-2 h-10 rounded-sm w-25 text-black  bg-gradient-to-r from-stone-200 to-gray-300 hover:bg-gradient-to-l rounded-r-lg  text-sm font-semibold flex justify-center items-center" id="cancel">cancel</a>
            <button type="button" data-id="${id}" class=" border-gray-200 cursor-pointer px-2 h-10 rounded-sm w-25 text-white bg-blue-500 rounded-r-lg  text-sm font-semibold flex justify-center items-center" id="editpoll">Edit Poll</button>
            
            </div>
            </div>`
            
            isFirstOption=false;
            
            editScreenOverlay.classList.add("flex");
            editScreenOverlay.classList.remove("hidden");  
            WantToEditpoll=getData.find(item=>item.pollId==id);
            optionCount=WantToEditpoll.pollOptions.length;

            }

            

let optionCount;
let addOptionBtn=document.getElementById("addOptionBtn")
let editedInfo={}
// add options of edit poll 
let editAddOptions=(id)=>{


    let pollOptDiv=document.getElementById("poll-options")
    console.log(id);
    
    let pollTitlevalue=document.getElementById("pollTitle").value.trim();

if(pollTitlevalue){
        if(optionCount>=4){    
        notyf.error("you have only 4 options to add")
        return
        }
        
        if(optionCount==0){
            optionCount++; 
            const div=document.createElement("div");
            div.classList="flex items-center my-2"             
            div.innerHTML +=` 
               
            <div class="flex w-full items-center gap-1 mb-2 ">
            <button class=" w-15 py-2 h-auto rounded-sm bg-blue-200 remove-option-btn text-blue-500 font-bold hover:text-blue-700" >${optionCount}</button>
            <input type="text" class="bg-transparent border-gray-200 border-2 w-full rounded-sm poll-option-input" placeholder="option ${optionCount}"  id="option${optionCount}">
            <div class="flex justify-center items-center">
            <i data-id="${optionCount}" class="w-10 py-2 h-auto rounded-sm deletepolloption fa-regular text-xl text-center text-white bg-red-500 hover:bg-red-100 hover:text-red-600 fa-trash-can"></i>
            </div>
            </div>
          
                    `
            pollOptDiv.appendChild(div);
        }else{   

        const optionInputs = document.querySelectorAll('input[id^="option"]');
        const values = Array.from(optionInputs).map(input => input.value.trim());
        const lastValue = values[values.length - 1];
        console.log(lastValue);
         if(lastValue){
            optionCount++
            console.log(optionCount);
            
            const div=document.createElement("div");
            div.classList="flex items-center my-2"             
            div.innerHTML +=`  
            <div class="flex w-full items-center gap-1 mb-2 ">
            <button class=" w-15 py-2 h-auto rounded-sm bg-blue-200 remove-option-btn text-blue-500 font-bold hover:text-blue-700" >${optionCount}</button>
            <input type="text" class="bg-transparent border-gray-200 border-2 w-full rounded-sm poll-option-input" placeholder="option ${optionCount}"  id="option${optionCount}">
            <div class="flex justify-center items-center">
            <i data-id="${optionCount}" class="w-10 py-2 h-auto rounded-sm deletepolloption fa-regular text-xl text-center text-white bg-red-500 hover:bg-red-100 hover:text-red-600 fa-trash-can"></i>
            </div>
            </div>
         
                    `
            pollOptDiv.appendChild(div);
            
            }else{
                notyf.error("enter option feild first ")
            }
        }
    }
}

// delete option of edit poll
let editDeleteOptions=(id)=>{
    let pollOptDiv=document.getElementById("poll-options")
    const optionInputs = document.querySelectorAll('input[id^="option"]');
    const inputarray = Array.from(optionInputs);
    console.log(id);
    
    if(inputarray.length>2){
    console.log(inputarray);
    inputarray[id-1].remove();
    optionCount--;
    let updatedoptionInputs = document.querySelectorAll('input[id^="option"]');
    let updatedinputArray = Array.from(updatedoptionInputs);
    let values = updatedinputArray.map(input => input.value.trim());
    console.log("Updated NodeList:", updatedinputArray);
     pollOptDiv.innerHTML="";

    updatedinputArray.forEach((item,index)=>{
        const div=document.createElement("div");
        div.classList="flex items-center my-2"             
        div.innerHTML +=` 
        <div class="flex w-full items-center gap-1 mb-2 ">
        <button class=" w-15 py-2 h-auto rounded-sm bg-blue-200 remove-option-btn text-blue-500 font-bold hover:text-blue-700" >${index+1}</button>
        <input type="text" ${item} class="border-gray-200 border-2 w-full rounded-sm bg-transparent" placeholder="option ${index+1}" value="${values[index]}"  id="option${index+1}">

        <div class="flex justify-center items-center">
        <i data-id="${index+1}" class="w-10 py-2 h-auto rounded-sm deletepolloption fa-regular text-xl text-center text-white bg-red-500 hover:bg-red-100 hover:text-red-600 fa-trash-can"></i>
        </div>
        </div>
    
                `
        pollOptDiv.appendChild(div);
    })

    

    }else{
        notyf.error("Two optons are mandatory");
    }
    
    

}

let optionToSave;
let saveEditpoll=(id)=>{

 let pollTitlevalue=document.getElementById("pollTitle").value.trim();
 editedInfo.title=pollTitlevalue;
 
 let gettingPollOptions = document.querySelectorAll('input[id^="option"]');
 let inputOfEditPoll = Array.from(gettingPollOptions);
 let values = inputOfEditPoll.map(input => 
    
   optionToSave={
       optionvalue:input.value.trim(),
       optionVotes:0
    }

    


);


 editedInfo.pollOptions=values;

 let now=new Date();
 editedInfo.timestamp=now.toDateString();
 
    let pollDescriptionvalue=document.getElementById("polldescription").value;
    console.log(pollDescriptionvalue);
    

    if (pollDescriptionvalue) {
        editedInfo.description=pollDescriptionvalue; 

    }

    if(editedInfo.title !=WantToEditpoll.pollTitle || editedInfo.pollOptions.length != WantToEditpoll.pollOptions.length || editedInfo.description != WantToEditpoll.pollDescription){
        gettingpoll.pollTitle=editedInfo.title;
        gettingpoll.pollOptions=editedInfo.pollOptions;
        gettingpoll.pollDescription=editedInfo.description;
        gettingpoll.timestamp= editedInfo.timestamp;
        localStorage.setItem("polls" , JSON.stringify(getData));
            notyf.success("Edited Successfully")
        
        setTimeout(() => {
            location="../my-polls/mypolls.html"
        }, 1000); 

    }else{
            notyf.error("please edit something")
        console.log("you don't edit anything");
        return
    }
}

let cancelEditPopup=()=>{
    editScreenOverlay.classList.add("hidden");
    editScreenOverlay.classList.remove("flex");
}

let cancelbtn=document.getElementById("cancelbtn");
let cross=document.getElementById("cross");
let cancel=()=>{
    screenOverlay.classList.remove("flex");
    screenOverlay.classList.add("hidden");

}

// showing poll for votes

// let showingPollForVoting=(id)=>{
//  console.log(id);

// let gettingpolloptions;
// let gettingPollForVote =getData.find(item=>item.pollId==id);
// console.log(gettingPollForVote);


// let voteScreenOverlay =document.getElementById("votescreenoverlay")

// voteScreenOverlay.innerHTML=`  <div class=" bg-white w-9/12 px-6 py-2 h-auto shadow-lg  rounded-md ">
//     <div class="flex px-6 py-2 justify-between w-full items-center">
//     <div class="flex-1">
//     <span class="text-4xl text-blue-600 font-bold">Cast Your Vote</span>
//     </div>
    
//     <div class="flex-1 flex justify-end">
//     <a id="backfromvote"  class="hover:cursor-pointer w-2/12 m-4 px-3 text-md text-center font-semibold text-black py-2 bg-gradient-to-r from-stone-200 to-gray-300 hover:bg-gradient-to-l  rounded-md ">Back</a>
//     </div>
//     </div> 
        
//     <form class="w-full h-auto mt-6 px-6 py-2">
//     <div class="flex items-start">
//     <div class="w-full mb-5 ">
//     <span class="text-black text-xl font-semibold" >${gettingPollForVote.pollTitle}</span>
//     ${gettingPollForVote.pollDescription ? 
//     `<div class=" w-full text-gray-500">
//     ${gettingPollForVote.pollDescription}
//     </div>
//     </div>`: ""}
//     </div>


//     <div class="flex justify-start w-full flex-col">
//     <div id="poll-options" class=" flex flex-col w-full mt-4">
//     ${gettingpolloptions =gettingPollForVote.pollOptions.map((option, index) => `
//     <div class="flex items-center gap-2 mb-2 w-full bg-blue-100 rounded-sm px-4 py-2 ">
//     <input id="${index}" type="radio" name="options" class="votecheckbox bg-white border-gray-200  rounded poll-option-input" placeholder="Enter Option" value="${option}" ">
//     <span class="text-lg font-semibold ">${option}</span>
//     </div>
//     `).join("")}
//     </div>

//     </div>
//     </form>
    
//     <div class="w-full flex my-8 gap-6 justify-end">   
//     <button onclick="submitVote()" data-id="${id}"  type="button" class=" border-gray-200 cursor-pointer px-2 h-10 rounded-sm w-25 text-white bg-blue-500 rounded-r-lg  text-sm font-semibold flex justify-center items-center" id="submitpoll">Submit Vote</button>
//     </div>
//     </div>`
 
//     voteScreenOverlay.classList.add("flex");
//     voteScreenOverlay.classList.remove("hidden");     
// }

// submit vote

// let totalVotes=0
// let submitVote=(id)=>{
//     console.log(id);
    
//     let gettingDataForCheckedOption=getData.find(item=>item.pollId==id);
//     console.log(gettingDataForCheckedOption);
    
    
//     let optionsVote=document.getElementById("poll-options")

//     let checkbox=optionsVote.querySelectorAll(".votecheckbox");

//     let optionVotes = [];

//     checkbox.forEach( options => {
//         if(options.checked==true){
//             let value=options.value; 
//             let votes=0;    
//             votes++;  

//             optionVotes.push({ votes, value });

//             gettingDataForCheckedOption.votesDetail=optionVotes;
            
//             gettingDataForCheckedOption.pollvotes =totalVotes++;

//             localStorage.setItem("polls", JSON.stringify(gettingDataForCheckedOption)); 
//             console.log(getData);
            
//         }
//         })
//     };




// accessing btns
document.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".deletepoll");
    const editBtn = e.target.closest(".editpoll");
    const cancelBtnDeletePopup = e.target.closest("#cancelbtn");
    const crossBtnDeletePopup = e.target.closest("#cross");
    const deletepollbtn = e.target.closest("#deletebtn");
    const cancelBtnEditPopup = e.target.closest("#cancel");
    const backBtnEditPopup = e.target.closest("#back");
    const editpoll = e.target.closest("#editpoll");
    const editAddOption = e.target.closest("#addOptionBtn");
    const deletePollOption = e.target.closest(".deletepolloption");
    const votebtnPoll = e.target.closest(".votebtn");
    const submitPollVote = e.target.closest("#submitpoll");


    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        console.log("Delete poll ID:", id);
        showDeletePopup(id)
    }

    if (editBtn) {
        const id = editBtn.dataset.id;
        console.log("Edit poll ID:", id);
        showeditPollPopUp(id);
    }
    
    if(cancelBtnDeletePopup){
        cancel()
    }
    if(crossBtnDeletePopup){
        cancel()
    }
    if(deletepollbtn){
        const id = deletepollbtn.dataset.id;
        deletepoll(id)
    }
    if(cancelBtnEditPopup){
      cancelEditPopup()
    }
    if(backBtnEditPopup){
       cancelEditPopup()
    }
    if(editpoll){
        const id = editpoll.dataset.id;
        saveEditpoll(id);
    }
    if(editAddOption){
        const id = editAddOption.dataset.id;
        editAddOptions(id);
    }
    if(deletePollOption){
        const id = deletePollOption.dataset.id;
        editDeleteOptions(id);
    }
    if(votebtnPoll){
        const id = votebtnPoll.dataset.id;
        showingPollForVoting(id);
    }
    if(submitPollVote){
        const id = submitPollVote.dataset.id;
        submitVote(id);
    }
  
});
