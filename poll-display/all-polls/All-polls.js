let currentUser=JSON.parse(localStorage.getItem("currentUser"))||[];
let getData=JSON.parse(localStorage.getItem("polls"))||[];
let user=JSON.parse(localStorage.getItem("user"))||[];
let main=document.getElementById("main-div");
let pollDetail=document.getElementById("polldetail");
let pollTitle=document.getElementById("polltitle")
let searchBtn=document.getElementById("searchbtn");
const notyf = new Notyf({
    duration: 1000,
    position: { x: 'right', y: 'top' }
});
let currentperson;


if(getData.length==0){
    main.innerHTML+=` <span id="polltitle" class="text-xl mt-20 w-full justify-center font-semibold items-center text-gray-600 font-serif flex ">No Polls Available</span>`
}


getData.forEach(items => { 
  
    currentpollperson=user.find(item=>item.id==items.userId);
 
    
    main.innerHTML+=` <div class="flex flex-col shadow-md h-auto py-4 px-8 mt-6 rounded-md justify-start bg-white  border-gray-200 border-2 ">
                    <span id="polltitle" class="text-xl font-bold">${items.pollTitle}</span>
                    
                     ${items.pollDescription && items.pollDescription.trim() !== '' ? `
                    <p class="text-gray-600 text-md mt-1">${items.pollDescription}</p>
                    ` : ''}
        
                     <ul class="full flex flex-col sm:flex-row  gap-2 mt-4" ">
                         ${items.pollOptions.map(item => `
                        <li class="bg-blue-100 text-blue-500 font-semibold w-auto h-auto min-w-15 min-h-5 flex justify-center items-center py-2 px-4 rounded-sm sm:rounded-full">
                        ${item.optionvalue}
                        </li>
                    `).join('')}   
                     </ul>
        
                    <div id="polldetail" class="flex sm:flex-row flex-col justify-between items-center mt-8">
                        <div class="flex w-full justify-start flex-col">
                            <span class="text-gray-600 text-lg font-semibold">Created By <span id="poll-created-name" class="
                                text-blue-600 text-lg font-bold">${currentpollperson.username}</span></span>
                            <p id="date" class="text-gray-500 text-lg ">${items.timestamp}</p>
                        </div>
        
                        <div class="w-full mt-5 sm:mt-0 flex sm:gap-0 gap-8 justify-end sm:flex-row flex-col items-start sm:items-center">
                        <p class="text-gray-500 text-lg  ">Votes <span id="vote">${items.pollvotes}</span></p>  
                        <a  onclick="savePollForVotes(${items.pollId})" class="voteNow hover:cursor-pointer w-full sm:w-30 sm:m-4 sm:px-3 text-md text-center font-semibold text-black py-2 bg-gradient-to-r from-blue-100 to-blue-400 hover:bg-gradient-to-l  rounded-md ">Vote Now</a>
                        </div>
                    </div>
                    </div>
          
                    </div>`
                    
                 
                }
);


// searching polls
let serachingpoll=()=>{
   let searchPoll=document.getElementById("search").value.trim().toUpperCase();

   if(searchPoll!=""){
       let poll=getData.filter(item=>item.pollTitle.toUpperCase().includes(searchPoll) || item.pollDescription.toUpperCase().includes(searchPoll) )
       console.log(poll);

   main.innerHTML=""
   if(poll.length==0){
       main.innerHTML=` <p id="polltitle" class="text-xl mt-20 w-full justify-center font-semibold items-center text-gray-600 font-serif flex ">No polls available on this search</p>`
    }
    
    
    poll.forEach(items => {
        searchPoll=""
        currentpollperson=user.find(item=>item.id==items.userId);
        
        main.innerHTML+=` <div class="flex flex-col shadow-md h-auto py-4 px-8 mt-6 rounded-md justify-start bg-white  border-gray-200 border-2 ">
            <span id="polltitle" class="text-xl font-bold">${items.pollTitle}</span>
            
             ${items.pollDescription && items.pollDescription.trim() !== '' ? `
            <p class="text-gray-600 text-md mt-1">${items.pollDescription}</p>
            ` : ''}

             <ul class="full flex flex-col sm:flex-row  gap-2 mt-4" ">
                 ${items.pollOptions.map(item => `
                <li class="bg-blue-100 text-blue-500 font-semibold w-auto h-auto min-w-15 min-h-5 flex justify-center items-center py-2 px-4 rounded-sm sm:rounded-full">
                ${item}
                </li>
            `).join('')}   
             </ul>

            <div id="polldetail" class="flex sm:flex-row flex-col justify-between items-center mt-8">
                <div class="flex w-full justify-start flex-col">
                    <span class="text-gray-600 text-lg font-semibold">Created By <span id="poll-created-name" class="
                        text-blue-600 text-lg font-bold">${currentpollperson.username}</span></span>
                    <p id="date" class="text-gray-500 text-lg ">${items.timestamp}</p>
                </div>

                <div class="w-full mt-5 sm:mt-0 flex sm:gap-0 gap-8 justify-end sm:flex-row flex-col items-start sm:items-center">
                <p class="text-gray-500 text-lg  ">Votes <span id="vote">${items.pollvotes}</span></p>  
                <a href="" class="hover:cursor-pointer w-full sm:w-30 sm:m-4 sm:px-3 text-md text-center font-semibold text-black py-2 bg-gradient-to-r from-blue-100 to-blue-400 hover:bg-gradient-to-l  rounded-md ">Vote Now</a>
                </div>
            </div>
            </div>
  
         </div>`

        })
        
    }else{
      notyf.error("please write something to search")  
      return
    }
}

let savePollForVotes=(id)=>{
     console.log(id);

    let gettingPllForVotes=getData.filter(item=>item.pollId==id)
    localStorage.setItem("savePollForVotes",JSON.stringify(gettingPllForVotes))


      setTimeout(() => {
            location="/pollVotes/pollVotes.html"
        }, 1000); 

     
}

searchBtn.addEventListener("onchange",serachingpoll)

