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
const btns = document.querySelectorAll("[data-target]");
const close_forms = document.querySelectorAll(".close-form");
const overlay = document.getElementById("overlay");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.add("active");
    overlay.classList.add("active");
  });
});

close_forms.forEach((btn) => {
  btn.addEventListener("click", () => {
    const forms = btn.closest(".form");
    forms.classList.remove("active");
    overlay.classList.remove("active");
  });
});

window.onclick = (event) => {
  if (event.target == overlay) {
    const forms = document.querySelectorAll(".form");
    forms.forEach((forms) => forms.classList.remove("active"));
    overlay.classList.remove("active");
  }
};
