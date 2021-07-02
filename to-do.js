let con = document.getElementById('wrapper1');
let str = document.getElementById('fname');
let Id = 1;
let notes = document.getElementsByClassName("notes");
let flag = 0;

function remove(Id) {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].getAttribute("data-id") == Id) {
            notes[i].remove();
        }
    }
    save();

}

function addToDOM(Id, complete, note) {
    /**
     * Creating the todoDiv using input field
     * 
     *          <div class="notes">
     *                  <input type="checkbox">
     *                      <span></span>
     * 
     */


    /*
        creating todoDiv and setting text
    */
    let todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "notes");
    todoDiv.setAttribute("data-Id", `${Id}`);



    /**
     * 
     */
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onclick","save()");
    checkbox.checked = complete;


    let para = document.createElement("span");
    para.setAttribute("class", "para");
    para.innerText = note;

    let button = document.createElement("button");
    button.setAttribute("onclick", `remove(${Id})`);
    button.innerHTML = "delete";

    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(para);
    todoDiv.appendChild(button);
    con.appendChild(todoDiv);

}
/**  
 *this function returns array of todos
 [   
    {
        id:integer,
        complete:boolean,
        note:String
    }
 ]
*/
function getToDos() {
    let todoList = [];
    for (let i = 0; i < notes.length; i++) {
        todoList.push({
            id: notes[i].getAttribute("data-id"),
            complete: notes[i].children[0].checked,
            note: notes[i].children[1].innerHTML
        });
    }
    return todoList;
}


function Add() {
    addToDOM(Id++, false , str.value);
    str.value = "";
    save();
}

/**
 * saving data to localStorage from getTODos function
 */

function save() {
    let todoList = getToDos();  
    localStorage.setItem("note", JSON.stringify(todoList));
    localStorage.setItem("id",Id);
}

/**
 * 
 * Getting data from localStorage and fetching it 
 */

function getData(flag) {
    Id=localStorage.getItem("id");
    if (flag) {
        flag = 0;
        if (localStorage.length) {
            let temp = localStorage.getItem("note");
            let todoList = JSON.parse(temp);
            for (let i = 0; i < todoList.length; i++) {
                addToDOM(todoList[i].id, todoList[i].complete, todoList[i].note);
            }
        }
    }
}

/**
 * adding event listner to know whether page refreshed or not
 */
window.addEventListener('load', (event) => {
    flag = 1;
    getData(flag);
});
