
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://to-work-list-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const toDoListInDb = ref(database, "taskList");

const taskItem = document.getElementById("task-list");
const inputItem = document.getElementById("input-text");
const addItemBtn = document.getElementById("add-to-list");

onValue(toDoListInDb,function(snapshot){
    clearHTML()
    let doArray = Object.entries(snapshot.val())
    for( let task of doArray){
        addTaskToHTML(task)
    }
})

addItemBtn.addEventListener('click', function(){
    
    push(toDoListInDb, inputItem.value)
    inputItem.value = ""
})


function addTaskToHTML(item){

    let itemId = item[0]
    let itemName = item[1]

    /* taskItem.innerHTML += `<div class="task">${itemName}</div>`  */
    let newEl = document.createElement("li")
    newEl.textContent = itemName

    taskItem.append(newEl)

    newEl.addEventListener("dblclick", function(){
        let exactLocationTask = ref(database, `taskList/${itemId}`)
        remove(exactLocationTask)
    })

}

function clearHTML(){
    taskItem.innerHTML =""
}