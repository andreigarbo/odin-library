const MARK_AS_READ = "Mark as Read";
const MARK_AS_UNREAD = "Mark as Unread";

class Book {
    constructor(title, author, pageCount, read) {

        if (title == "" || title == null) {
            alert("Please enter a title");
            return null;
        }
        if (author == "" || author == null) {
            alert("Please enter an author");
            return null;
        }
        if (pageCount == "" || pageCount == null) {
            alert("Please enter a page count");
            return null;
        }

        this._id = crypto.randomUUID();
        this._title = title;
        this._author = author;
        this._pageCount = pageCount;
        this._read = read;
    }

    get title(){
        return this._title;
    }

    get id() {
        return this._id;
    }

    set title(newTitle) {
        this._title = newTitle;
    }

    get author() {
        return this._author;
    }

    get pageCount() {
        return this._pageCount;
    }

    get read() { 
        return this._read;
    }

    set read(readStatus) {
        if (readStatus == true || readStatus == false) this._read = readStatus;
    }

    toggleReadState() {
        if (this._read == true) {
            this._read = false;
        } else {
            this._read = true;
        }
    }
};

class Library {
    constructor() {
        this._content = [];
    }

    get content() {
        return this._content;
    }

    addBook(book) {
        this._content.push(book);
    }

    getBook(bookId) {
        let index = this._content.findIndex(element => element.id == bookId);
        return this._content[index];
    }

    removeBook(bookId) {
        let index = this._content.findIndex(element => element.id == bookId);
        this._content.splice(index, 1);
    }
};

class DisplayController {
    constructor() {
        this.addBookButton = document.getElementById("add-book-button");
        this.addBookForm = document.getElementById("add-book-form");
        this.closeBookFormButton = document.getElementById("close-add-book-form");

        this.titleField = document.getElementById("book-title");
        this.authorField = document.getElementById("book-author");
        this.pageCountField = document.getElementById("book-page-count");
        this.readField = document.getElementById("book-read");

        this.bookGrid = document.getElementById("book-grid");

        this.library = new Library();

        this.bindEvents();
    }

    updateBookGrid() {
        this.bookGrid.innerHTML = '';

        let currentLibraryContent = this.library.content;
        for (let key in currentLibraryContent) {
            let book = currentLibraryContent[key];
            this.bookGrid.append(this.createBookCard(book));
        }
    }

    createBookCard(book) {
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
            this.library.getBook(book.id).toggleReadState();
            this.updateBookGrid();
        });

        let deleteBookButton = document.createElement("button");
        deleteBookButton.textContent = "Delete";
        deleteBookButton.classList.add("book-card-delete");

        deleteBookButton.addEventListener("click", () => {
            // deleteBook(book.id);
            this.library.removeBook(book.id);
            this.updateBookGrid();
        });

        buttonDiv.append(markBookAsReadButton, deleteBookButton);

        bookCard.append(titlePara, titleParaContent, authorPara, authorParaContent, pageCountPara, pageCountParaContent, readPara, readCheckbox, buttonDiv);
        return bookCard;
    }

    toggleFormVisibility() {
        if (this.addBookForm.classList.contains("form-hidden")) {
            this.addBookForm.classList.remove("form-hidden");
            this.addBookForm.classList.add("form-visible");
        } else {
            this.addBookForm.classList.remove("form-visible");
            this.addBookForm.classList.add("form-hidden");
        }
    }

    bindEvents() {
        this.addBookForm.onsubmit = (event) => {
            event.preventDefault();
            const newBook = this.createBook();
            if (newBook == null)
                return;
            this.library.addBook(newBook);
            this.updateBookGrid();
            this.toggleFormVisibility();
            this.clearFormFields();
        }

        this.addBookButton.addEventListener("click", ()=> {
            this.toggleFormVisibility();
        });

        this.closeBookFormButton.addEventListener("click", (event)=> {
            event.preventDefault();
            this.toggleFormVisibility();
            this.clearFormFields();
        })
    }

    createBook() {
        const bookTitle = this.titleField.value;
        const bookAuthor = this.authorField.value;
        const bookPageCount = this.pageCountField.value;
        const bookRead = this.readField.checked ? true : false;

        return new Book(bookTitle, bookAuthor, bookPageCount, bookRead);
    }

    clearFormFields() {
        this.addBookForm.reset();
    }
};

const displayController = new DisplayController();