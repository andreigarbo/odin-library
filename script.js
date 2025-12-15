const myLibrary = [];
const MARK_AS_READ = "Mark as Read";
const MARK_AS_UNREAD = "Mark as Unread";

function Book(title, author, pageCount, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}

function clearFormFields() {
    addBookForm.reset();
}

function updateBookGrid() {

    bookGrid.innerHTML = "";

    for (var key in myLibrary) {
        let book = myLibrary[key];
        addBookCardToGrid(book);
    }
}

function addBookCardToGrid(book) {

    let markAsReadButtonText;

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = book.id;

    let titlePara = document.createElement("p");
    titlePara.innerText = "Title:";

    let titleParaContent = document.createElement("p");
    titleParaContent.innerText = book.title;
    titleParaContent.classList.add("book-card-title");

    let authorPara = document.createElement("p");
    authorPara.innerText = "Author:";

    let authorParaContent = document.createElement("p");
    authorParaContent.innerText = book.author;
    authorParaContent.classList.add("book-card-author");

    let pageCountPara = document.createElement("p");
    pageCountPara.innerText = "Page count:";

    let pageCountParaContent = document.createElement("p");
    pageCountParaContent.innerText = book.pageCount;
    pageCountParaContent.classList.add("book-card-page-count");

    let readPara = document.createElement("p");
    readPara.innerText = "Read:";

    let readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.checked = book.read;
    readCheckbox.addEventListener("click", (event) => {
        event.preventDefault();
    });

    if (book.read) {
        markAsReadButtonText = MARK_AS_UNREAD;
    } else {
        markAsReadButtonText = MARK_AS_READ;
    }

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("book-card-buttons");

    let markBookAsReadButton = document.createElement("button");
    markBookAsReadButton.textContent = markAsReadButtonText;
    markBookAsReadButton.classList.add("book-card-mark-as-read");

    markBookAsReadButton.addEventListener("click", () => {
        markBookAsRead(book.id);
    });

    let deleteBookButton = document.createElement("button");
    deleteBookButton.textContent = "Delete";
    deleteBookButton.classList.add("book-card-delete");

    deleteBookButton.addEventListener("click", () => {
        deleteBook(book.id);
    });

    buttonDiv.append(markBookAsReadButton, deleteBookButton);

    bookCard.append(titlePara, titleParaContent, authorPara, authorParaContent, pageCountPara, pageCountParaContent, readPara, readCheckbox, buttonDiv);
    bookGrid.append(bookCard);
}

function markBookAsRead(bookId) {
    for (var key in myLibrary) {
        let book = myLibrary[key];
        if (bookId == book.id) {
            book.read = !book.read;
        }
    }
    updateBookGrid();
}

function deleteBook(bookId) {
    let index = myLibrary.findIndex(element => element.id == bookId);

    myLibrary.splice(index, 1);
    updateBookGrid();
}

function addBookToLibrary() {
    let title = titleField.value;

    if (title == "" || title == null) {
        alert("Please enter a title");
        return;
    }

    let author = authorField.value;

    if (author == "" || author == null) {
        alert("Please enter an author");
        return;
    }

    let pageCount = pageCountField.value;

    if (pageCount == "" || pageCount == null) {
        alert("Please enter a page count");
        return;
    }

    let read = readField.checked ? true : false;

    let book = new Book(title, author, pageCount, read);
    clearFormFields();

    myLibrary.push(book);

    updateBookGrid();
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

let titleField = document.getElementById("book-title");
let authorField = document.getElementById("book-author");
let pageCountField = document.getElementById("book-page-count");
let readField = document.getElementById("book-read");

let bookGrid = document.getElementById("book-grid");

addBookForm.onsubmit = (event) => {
    event.preventDefault();
    addBookToLibrary();
    updateBookGrid();
    toggleFormVisibility(addBookForm);
    clearFormFields();
}

addBookButton.addEventListener("click", ()=> {
    toggleFormVisibility(addBookForm);
});

closeBookFormButton.addEventListener("click", (event)=> {
    event.preventDefault();
    toggleFormVisibility(addBookForm);
    clearFormFields();
})