const myLibrary = [];

function Book(title, author, pageCount, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}

function addBookToLibrary() {
    
}

function toggleFormVisibility(form) {
    if (form.classList.contains("form-hidden")) {
        form.classList.remove("form-hidden");
        form.classList.add("form-visible");
    } else {
        form.classList.remove("form-visible");
        form.classList.add("form-hidden");
    }
}

let addBookButton = document.getElementById("add-book-button");
let addBookForm = document.getElementById("add-book-form");
let closeBookFormButton = document.getElementById("close-add-book-form");

addBookButton.addEventListener("click", ()=> {
    toggleFormVisibility(addBookForm);
});

closeBookFormButton.addEventListener("click", ()=> {
    preventDefault();
    toggleFormVisibility(addBookForm);
})