const todos = document.querySelectorAll(".first-todo");
const all_status = document.querySelectorAll(".status");
// do not know which item will be dragged
let draggableTodo =  null;

todos.forEach((todo) =>{
    // dragstart kicks in when start dragging an item
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});

// start click and drag
function dragStart(){
    draggableTodo = this;
    console.log("dragStart");
}

// when release click
function dragEnd(){
    draggableTodo = null;
    console.log("dragEnd");
}

// columns are called drop target
all_status.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
});

// when user have yet to release their click, still hovering around the columns
function dragOver(o){
    // console.log("dragOver");
    // do not allow drop target to grab the draggable item
    o.preventDefault(); //because by default dropping an item within an element is disable

}

// when drag item enter the drop target
function dragEnter(){
    this.style.border = "3px solid #ccc";
    console.log("dragEnter");
}

// when drag item leave the drop target
function dragLeave(){
    this.style.border = "none";
    console.log("dragLeave");
}

// when the item is drop within a drop target
function dragDrop(){
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("dragDrop");
}

// --------------------------------------
// grabbing every single thing that require to open the form
const btns = document.querySelectorAll("[data-target]");
// grabbing every thing that require to close the form
const close_forms = document.querySelectorAll(".close-form");
const overlay = document.getElementById("overlay");


btns.forEach((btn) => {
  // when click "add to-do button"
  btn.addEventListener("click", () => {
    // open the form
    document.querySelector(btn.dataset.target).classList.add("active");
    // activate the overlay beneath
    overlay.classList.add("active");
  });
});

close_forms.forEach((btn) => {
  // when the "cross btn" is clicked
  btn.addEventListener("click", () => {
    // close form
    const forms = btn.closest(".form");
    forms.classList.remove("active");
    // remove overlay
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  // if clicked on empty space(on the overlay) outside the form
  if (event.target == overlay) {
    // close the form
    const forms = document.querySelectorAll(".form");
    forms.forEach((forms) => forms.classList.remove("active"));
    // deactivate the overlay
    overlay.classList.remove("active");
  }
};

// upon to-do button clicked
// create to-do
const todo_submit = document.getElementById("todo_submit");
// onclick run createTodo function
todo_submit.addEventListener("click", createTodo);

function createTodo(){
   // first create a div
   const todo_div = document.createElement("div");
   // grab the content written in the text-box in form
   const input_content = document.getElementById("todo_input").value;
   // creating a text node so to attach it to the div
   const txt = document.createTextNode(input_content);

   todo_div.appendChild(txt); 
   // add in the class of todo
   todo_div.classList.add("first-todo");
   // set draggable to true
   todo_div.setAttribute("draggable", "true");

   // the done button("cross"), upon finishing a task
   const span = document.createElement("span");
   const span_text = document.createTextNode("\u00D7");
   span.classList.add("close");
   span.appendChild(span_text);

   // add span to todo list
   todo_div.appendChild(span);

   console.log(todo_div);

   //add to To-do column
   Todo_status.appendChild(todo_div);

   // allow newly add to-do to be draggable
   todo_div.addEventListener("dragstart", dragStart);
   todo_div.addEventListener("dragend", dragEnd);

   // close form and overlay when todo is created
   todo_form.classList.remove("active");
   overlay.classList.remove("active");

}
