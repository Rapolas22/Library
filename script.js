const addBookBtn = document.getElementById("AddBtn");
const dialog = document.getElementById("my-dialog");
const closeBtn = document.getElementById("closeBtn");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});


closeBtn.addEventListener("click", () => {
    dialog.close();
});

