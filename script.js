let filterColor=document.querySelectorAll(".filter");
let mainContainer=document.querySelector(".main-container");
let plusBtn=document.querySelector(".plus");
let removeBtn = document.querySelector(".remove");
let modalColor=document.querySelectorAll(".modal-color");
let modalContainer=document.querySelector(".modal-container");
let taskBox=document.querySelector(".task-box");
let filterContainers = document.querySelectorAll(".filter-color-container");
let modalFlag=false;
let colors=["pink","blue","green","black"];
let icolor="black";
let allTasks=[];
let flag=false;
let deleteState=false;
// init


if(localStorage.getItem("allTasks")){
    let strarr=localStorage.getItem("allTasks");
    allTasks=JSON.parse(strarr);
    for(let i=0;i<allTasks.length;i++){
        createTicketFromLocalstorage(allTasks[i]);
    }
}

for(let i=0;i<filterColor.length;i++){
    filterColor[i].addEventListener("click",function(){
        let classes=filterColor[i].getAttribute("class");
        let str=classes.split(" ");
        let color=str[1];
        let mainClasses=mainContainer.getAttribute("class");
        let mainCArr=mainClasses.split(" ");
        mainCArr[1]=color;
        mainClasses=mainCArr.join(" ");
        mainContainer.setAttribute("class",mainClasses);

    })
}

plusBtn.addEventListener("click",function(){
    if(flag==false){
        modalContainer.style.display="flex";
    }else{
        modalContainer.style.display="none";
    }

    flag=!flag;
})
taskBox.addEventListener("keydown",function(e){
        if(e.key=="Enter" && taskBox.value!=""){
              let taskContainer=  document.createElement("div");
              let id= Math.random().toString(32).slice(2);
              let ticketObj={};
          ticketObj.task=taskBox.value;
          ticketObj.color=icolor;
          ticketObj.id=id;
          createTicketFromLocalstorage(ticketObj)

          icolor="black";
          modalContainer.style.display="none";
          flag=false;
          taskBox.value="";
        }
    })

    for(let i=0;i<modalColor.length;i++){
    modalColor[i].addEventListener("click",function(){
        let color=modalColor[i].classList[1];
        icolor=color;
        for(let j=0;j<modalColor.length;j++){
            modalColor[j].classList.remove("border");
        }

        modalColor[i].classList.add("border");
    })
}

function  handleColorChange(taskContainer){
    let ticketcolor=taskContainer.querySelector(".ticket-color");
    ticketcolor.addEventListener("click",function(){
        let cColor=ticketcolor.classList[1];
        let idx=colors.indexOf(cColor);
      let newidx=(idx+1)%4;
      let newColor=colors[newidx];
      ticketcolor.classList.remove(cColor);
      ticketcolor.classList.add(newColor);

    //   local me add
    let ticketIdElelm=taskContainer.querySelector(".ticket-id");
    let currid=ticketIdElelm.innerText;
    currid=currid.slice(1);
    for(let i=0;i<allTasks.length;i++){
        if(allTasks[i].id==currid){
            allTasks[i].color=newColor;
            // local storage me add

         let strarr= JSON.stringify(allTasks);
          localStorage.setItem('allTasks',strarr);
        }
    }
    })
}

// ****Filtering Logic ********
let prevcolor=null;
for(let i=0;i<filterContainers.length;i++){
    filterContainers[i].addEventListener("click",function(){
        let child=filterContainers[i].children[0];
       let color= child.classList[1];
       if(prevcolor==color){
        let ticketContainer=document.querySelectorAll(".ticket-container");
        for(let j=0;j<ticketContainer.length;j++){
            ticketContainer[j].style.display="block";
        }
           prevcolor=null;
       }else{
        let ticketContainer=document.querySelectorAll(".ticket-container");
        for(let j=0;j<ticketContainer.length;j++){
            let ticketcolor=ticketContainer[j].children[0];
            let mycolor=ticketcolor.classList[1];
            if(mycolor==color){
                ticketContainer[j].style.display="block";
            }else{
             ticketContainer[j].style.display="none";
            }
        }
        prevcolor=color;
       }
       
    })
}



function createTicketFromLocalstorage(taskObj){
    let {task,color,id}=taskObj;
    let taskContainer=  document.createElement("div");
taskContainer.setAttribute("class","ticket-container");
taskContainer.innerHTML=`<div class="ticket-color ${color}"></div>
<div class="ticket-desc-container">
   <div class="ticket-id">#${id}</div>
   <div class="ticket-desc">${task}</div>
</div>`;
mainContainer.appendChild(taskContainer);
handleColorChange(taskContainer);
handleDeleteContainer(taskContainer);
}

function handleDeleteContainer(taskContainer){
taskContainer.addEventListener("click",function(){
    if(deleteState==true){
        let elem=taskContainer.querySelector(".ticket-id");
        let id=elem.innerText.slice(1);

        for(let i=0;i<allTasks.length;i++){
            if(allTasks[i].id==id){
                taskArr.splice(i,1);
                // local storage me add
    
             let strarr= JSON.stringify(allTasks);
              localStorage.setItem('allTasks',strarr);
            }
        }

        taskContainer.remove();
    }
})
}

removeBtn.addEventListener("click",function(){
    if(deleteState==false){
         removeBtn.style.backgroundColor = "rgb(100, 71, 26)";
    }else{
        removeBtn.style.backgroundColor="darkgray";
    }

    deleteState=!deleteState;
})


// Lock-Button Functionality

let lockBtn=document.querySelector(".lock");
let lockFlag=true;
lockBtn.addEventListener("click",function(){
    let ticket_desc=document.querySelectorAll(".ticket-desc");
    if(lockFlag==true){
        lockBtn.classList.remove("fa-lock");
        lockBtn.classList.add("fa-unlock-alt");
        for(let i=0;i<ticket_desc.length;i++){
            ticket_desc[i].setAttribute("contenteditable","true");
        }   
    }else {
        lockBtn.classList.remove("fa-unlock-alt");
        lockBtn.classList.add("fa-lock");
        for(let i=0;i<ticket_desc.length;i++){
            ticket_desc[i].setAttribute("contenteditable","false");
        } 
    }

    lockFlag=!lockFlag;

})