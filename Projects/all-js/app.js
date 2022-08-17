// Elementleri Alma
const yaziInput = document.querySelector("#text");
const colorInput = document.querySelector("#color-text");
const fontInput = document.querySelector("#font_text");
const geriAl = document.getElementById("h1").textContent;


// Eventleri Belirleme
document.getElementById("clr-text").addEventListener("click", yaziDegistir);
document.getElementById("clr").addEventListener("click", renkDegistir);
document.getElementById("clr-font").addEventListener("click", fontDegistir);


// Font Değiştirme
function fontDegistir() {
    showInputFontText();
    const newFont = fontInput.value.trim();
    document.getElementById("h1").style.fontFamily = newFont;
}

// Renk Değiştirme
function renkDegistir() {
    showInputColor();
    const newColor = colorInput.value.trim();
    document.getElementById("h1").style.color = newColor;
}

// Yazı Değiştirme
function yaziDegistir() {
    showInputText()
    const newText = yaziInput.value.trim();
    document.getElementById("h1").innerHTML = newText;
}

// Elementleri Gösterme
function showInputColor() {
    document.getElementById("color-text").style.display = "block";
}

function showInputText() {
    document.getElementById("text").style.display = "block";
}

function showInputFontText() {
    document.getElementById("font_text").style.display = "block";
}


// Değişiklikleri Uygulama ve Geri Alma
function degistir() {
    yaziDegistir();
    renkDegistir();
    fontDegistir();
    yaziInput.innerHTML = " ";
    colorInput.innerHTML = " ";
    fontInput.innerHTML = " ";
}

function gerial() {
    document.getElementById("h1").innerHTML = geriAl;
    document.getElementById("h1").style.color = "black";
    yaziInput.innerHTML = " ";
    colorInput.innerHTML = " ";
    fontInput.innerHTML = " ";
}