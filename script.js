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

function createTheCard(book){
    const div = document.createElement("div");
    div.classList.add("card");

    mainContent.appendChild(div);

}

class Book {
    constructor(name, author, pages, readOrNot) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.readOrNot = readOrNot;
        this.id = crypto.randomUUID();
    }

    static fromExisting(existingBook) {
        const book = new Book(existingBook.name, existingBook.author, existingBook.pages, existingBook.readOrNot);
        book.id = existingBook.id;
        return book;
    }
}

class Library {
    #bookList;

    constructor(listOfBooks = []) {
        this.#bookList = listOfBooks.map(book => Book.fromExisting(book));
    }

    addBook(book) {
        return this.#bookList.push(Book.fromExisting(book));
    }

    removeBook(book) {
        this.#bookList = this.#bookList.filter(b => b.id !== book.id);
    }
    
}

const myLibrary = new Library();
submit.addEventListener("click", (event) => {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").value;

    const newBook = new Book(name, author, pages, read);
    // Rekomenduojama: įsidedam knygą į bibliotekos sekimą
    myLibrary.addBook(newBook); 

    // Sukuriam vizualią kortelę
    createTheCard(newBook);
    
    // Uždarom dialogą po sėkmingo pridėjimo
    dialog.close();
})