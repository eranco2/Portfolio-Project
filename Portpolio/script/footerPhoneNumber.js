const phoneNumber = document.getElementById("showNumberWeb");
const phoneImg = document.getElementById("phoneImg")

function showPhoneNumber() {
    phoneNumber.innerText = " : 054-5724622"
}

function removePhoneNumber() {
    phoneNumber.innerText = ""
}

export function phoneOnClick() {
    phoneImg.addEventListener("click", () => {
        if (phoneNumber.innerText == "") {
            showPhoneNumber();
        } else {
            removePhoneNumber()
        }
    });
}

