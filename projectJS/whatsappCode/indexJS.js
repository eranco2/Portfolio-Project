const phoneNumber = document.getElementById("phoneNumber");
const text = document.getElementById("text");
const sendButton = document.getElementById("send");
const linksTableBody = document.getElementById("linksBody");
const helper = document.getElementById("helper");
const imgChat = document.querySelector("img");
let selectedLink = ""


sendButton.addEventListener("click", () => {
    let phoneNumberValue = phoneNumber.value.trim().replace(/[^0-9]/g, "");
    let textValue = text.value.trim();

    if (phoneNumberValue.length < 9) {
        helper.innerText = "המספר חייב להכיל מעל 9 ספרות";
        return;
    } else {
        helper.innerText = ""
    }
    urlText(phoneNumberValue, textValue);
})



function urlText(phoneNumberValue, textValue) {

    const encodeText = encodeURIComponent(textValue);
    const fullURL = `https://wa.me/${phoneNumberValue}?text=${encodeText}`
    console.log(fullURL);


    let textCode = document.getElementById("URLcode");
    textCode.innerText = fullURL;


    let copyURLcode = document.createElement("button");
    copyURLcode.innerText = "COPY LINK!"
    copyURLcode.addEventListener("click", () => {
        navigator.clipboard.writeText(fullURL)
            .then(() => {
                statusCopyLink.innerText = "link was copy";
                setTimeout(() => statusCopyLink.innerText = "", 2000);
            }).catch(err => console.error("שגיאה בהעתקה:", err));
    })

    const saveURLlink = document.createElement("button");
    saveURLlink.innerText = "SAVE THE LINK!"
    saveURLlink.addEventListener("click", () => {

        saveLink(phoneNumberValue, textValue, fullURL)
        renderLinksTable();
    })


    const statusCopyLink = document.createElement("p")
    URLcode.appendChild(statusCopyLink);
    URLcode.appendChild(copyURLcode);
    URLcode.appendChild(saveURLlink);
}


function saveLink(phoneNumberValue, textValue, fullURL) {
    let links = JSON.parse(localStorage.getItem("links")) || [];

    if (links.length >= 5) {
        alert("אי אפשר לשמור יותר מחמישה לינקים , במידה ותרצה תוכל למחוק לינק מהרשימה.")
        return;
    }

    if (links.some(link => link.fullURL === fullURL)) {
        alert(" צור לינק חדש ,הלינק והמידע כבר נשמרו במאגר.");
        return;
    }

    links.push({ phoneNumberValue, textValue, fullURL });
    localStorage.setItem("links", JSON.stringify(links));
}

function renderLinksTable() {
    linksTableBody.innerHTML = "";

    let links = JSON.parse(localStorage.getItem("links")) || [];

    links.forEach((link, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
        <td>${link.phoneNumberValue}</td>
        <td>${link.textValue}</td>
        <td><button onclick="copyToClipboard('${link.fullURL.replace(/'/g, "\\'")}')">📋 העתק</button></td>
        <td><button onclick="deleteLink(${index})">🗑️ מחק</button></td>
        `
        row.addEventListener("click", () => {
            selectedLink = link.fullURL;
            updateImageLink(selectedLink);
            highlightRow(row);
        });

        linksTableBody.appendChild(row);
    });
}

function copyToClipboard(fullURL) {
    navigator.clipboard.writeText(fullURL).then(() => {
        alert(" הלינק הועתק בהצלחה!");
    }).catch(err => console.error("שגיאה בהעתקה:", err));
}

function deleteLink(index) {
    let links = JSON.parse(localStorage.getItem("links")) || [];
    links.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(links));
    renderLinksTable();
}

function highlightRow(selectedRow) {
    document.querySelectorAll("tr").forEach(row => row.classList.remove("selected-row"));
    selectedRow.classList.add("selected-row");
}

function updateImageLink(url) {
    let image = document.getElementById("imageLink");
    if (!image.href) {
        alert("❌ יש לבחור שורה בטבלה לפני לחיצה על התמונה!");
        return;
    }

    imageLink.href = url;
    imageLink.classList.remove("disabled-link");
    imageLink.classList.add("enabled-link");
}

document.getElementById("imageLink").addEventListener("click", function (e) {
    if (!selectedLink) {
        e.preventDefault();
        alert("❌ יש לבחור שורה בטבלה לפני לחיצה על התמונה!");
    }
});


renderLinksTable()