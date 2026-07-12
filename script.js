const addBookBtn = document.getElementById("AddBtn");
const dialog = document.getElementById("my-dialog");
const closeBtn = document.getElementById("closeBtn");
const mainContent = document.getElementById("main");
const submit = document.getElementById("submit-btn");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});

class Book {
    constructor(name, author, pages, readOrNot) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.readOrNot = readOrNot;
        this.id = crypto.randomUUID();
    }
}

class Library {
    #bookList;

    constructor(listOfBooks = []) {
        this.#bookList = listOfBooks.map(book => new Book(book.name, book.author, book.pages, book.readOrNot));
    }

    get books() {
        return this.#bookList;
    }

    addBook(book) {
        return this.#bookList.push(book);
    }

    removeBookAt(index) {
        this.#bookList.splice(index, 1);
    }

    toggleReadAt(index) {
        this.#bookList[index].readOrNot = !this.#bookList[index].readOrNot;
    }
}

const myLibrary = new Library();

function renderLibrary() {
    mainContent.innerHTML = "";

    myLibrary.books.forEach((book, index) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.dataset.indexNumber = index;

        const btnClass = book.readOrNot ? "read" : "unread";
        const btnText = book.readOrNot ? "Read" : "Unread";

        div.innerHTML = `
            <div class="card-content">
                <h4>Name of the book:</h4>
                <p>${book.name}</p>
                
                <h4>Author of the book:</h4>
                <p>${book.author}</p>
                
                <h4>Total pages in the book:</h4>
                <p>${book.pages}</p>
            </div>
            <div class="buttons">
                <button class="status-btn ${btnClass}">${btnText}</button>
                <button class="status-btn remove-btn">Remove</button>
            </div>
        `;

        mainContent.appendChild(div);
    });
}

mainContent.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) return;

    const index = Number(card.dataset.indexNumber);

    if (event.target.classList.contains("remove-btn")) {
        myLibrary.removeBookAt(index);
        renderLibrary();
        return;
    }

    if (event.target.classList.contains("status-btn")) {
        myLibrary.toggleReadAt(index);
        renderLibrary();
    }
});

submit.addEventListener("click", (event) => {
    event.preventDefault();

    const nameValue = document.getElementById("name").value;
    const authorValue = document.getElementById("author").value;
    const pagesValue = document.getElementById("pages").value;
    const readValue = document.getElementById("read").checked;

    myLibrary.addBook(new Book(nameValue, authorValue, pagesValue, readValue));
    renderLibrary();

    document.getElementById("name").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;

    dialog.close();
});