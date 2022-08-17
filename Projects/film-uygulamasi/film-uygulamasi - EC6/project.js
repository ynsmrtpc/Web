const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

eventListener(); // Tüm Eventleri Yükleme

function eventListener() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function() {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFilm(event) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        UI.displayMessages("Tüm Alanları Doldurmanız Gereklidir!", "danger");
    } else {
        // yeni film
        const newFilm = new Film(title, director, url);
        UI.addFilmToUI(newFilm); // Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); // Storage'a film ekleme
        UI.displayMessages("Film Başarıyla Eklendi", "success");
    }
    UI.clearInput(titleElement, urlElement, directorElement);
    event.preventDefault();
}

function deleteFilm(event) {
    if (event.target.id === "delete-film") {
        UI.deleteFilmFromUI(event.target);
        Storage.deleteFilmFromStorage(event.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı!", "warning");
    }
}

function clearAllFilms() {
    if (confirm("Emin Misiniz?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
}