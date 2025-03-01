
const form = document.getElementById('whatsappForm');
let phoneInput = document.getElementById("phoneNumber");
let messageInput = document.getElementById("autoMessage");
const BTN = document.querySelector("input");
// const numberCode = "https://wa.me/";
// const textCode = "?text=";
// const plusCode = "%20";
let numbers = [];
localStorage.setItem("phone-numbers", JSON.stringify(numbers))

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const phoneNumbervalue = phoneInput.value;
    // console.log(phoneInput.value);
    saveToLocalStorge(phoneNumbervalue)
    displayPhoneNumber()
});


function saveToLocalStorge(value) {
    // localStorage.setItem("phone", value)
    const numbersArr = JSON.parse(localStorage.getItem("phone-numbers"))
    numbersArr.push(value)
    localStorage.setItem("phone-numbers", JSON.stringify(numbersArr))
}

function displayPhoneNumber() {
    const p = document.querySelector("p")
    p.innerText = localStorage.getItem("phone")
}

const clearPhoneNumber = phoneNumbervalue

console.log(clearPhoneNumber);



