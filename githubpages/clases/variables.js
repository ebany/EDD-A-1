import { DemoList } from "./demo2.js";

document.getElementById("btn1").onclick = function () { form1() };

const nameInput = document.getElementById('name');
const valueInput = document.getElementById('value');
const img = document.getElementById('img');
const avatar = document.getElementById("avatar");
const textArea = document.getElementById("textAreaExample");

export let demo2 = new DemoList();

export function form1() {
    let name = nameInput.value;
    let value = valueInput.value;

    demo2.agregar(name, value);

    //add items to table
    let tableRow = document.getElementById("table1");
    let row = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    cell1.innerHTML = name;
    cell2.innerHTML = value;
    row.appendChild(cell1);
    row.appendChild(cell2);
    tableRow.appendChild(row);

    //clean inputs
    nameInput.value = '';
    valueInput.value = '';

    //save info
    saveInfoLocalStorage();
}

function saveInfoLocalStorage() {
    localStorage.setItem('demo', JSON.stringify(demo2));
}

function getInfoLocalStorage() {
    demo2 = JSON.parse(localStorage.getItem('demo'));

    //add items to table
    let tableRow = document.getElementById("table1");
    for (const item of demo2.list) {
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        cell1.innerHTML = item.name;
        cell2.innerHTML = item.value;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableRow.appendChild(row);
    }
}

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    avatar.src = base64;
    textArea.innerText = base64;
};

img.addEventListener("change", (e) => {
    uploadImage(e);
});

getInfoLocalStorage();