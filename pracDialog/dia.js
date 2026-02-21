let url = "https://69665b0ff6de16bde44d2217.mockapi.io/zapper";

let box = document.querySelector(".box");
let add = document.querySelector(".addBtn");
let addModal = document.querySelector(".addModal");
let closeBtn = document.querySelector(".closeB");
let addBtn = document.querySelector(".addB");
let infoModal = document.querySelector(".infoModal");

let currentId = null;



async function getData() {
    let res = await fetch(url);
    let data = await res.json();
    showData(data);
}



function infoUser(user) {
    document.querySelector(".infoName").innerText = `Name: ${user.name}`;
    document.querySelector(".infoEmail").innerText = `Email: ${user.gmail}`;
    
    let statusEl = document.querySelector(".infoStatus");
    statusEl.innerText = `Status: ${user.status ? "Active" : "Inactive"}`;
    statusEl.style.color = user.status ? "green" : "red";

    infoModal.showModal();
}



async function deleteUser(id) {
    await fetch(`${url}/${id}`, { method: "DELETE" });
    getData();
}



async function saveUser() {
    let name = document.querySelector(".name").value;
    let gmail = document.querySelector(".email").value;
    let avatar = document.querySelector(".avatar").value;

    let userObj = { name, gmail, avatar };

    if (currentId) {
        await fetch(`${url}/${currentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userObj)
        });
    } else {
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userObj)
        });
    }

    addModal.close();
    currentId = null;
    getData();
}



function showData(data) {
    box.innerHTML = "";

    data.forEach(el => {

        let tr = document.createElement("tr");

        let tdavatar = document.createElement("td");
        tdavatar.innerHTML = `<img src="${el.avatar}" style="width:50px; height:50px; border-radius:50%;">`;

        let td1 = document.createElement("td");
        td1.innerText = el.name;

        let td2 = document.createElement("td");
        td2.innerText = el.gmail;

        let tdStatus = document.createElement("td");
        tdStatus.innerText = el.status ? "Active" : "Inactive";
        tdStatus.style.color = el.status ? "green" : "red";

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = el.status;

        checkBox.onchange = async () => {
            await fetch(`${url}/${el.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: checkBox.checked })
            });
            getData();
        };

        tdStatus.appendChild(checkBox);

        let tdActions = document.createElement("td");

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = () => deleteUser(el.id);

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = () => {
            currentId = el.id;
            document.querySelector(".name").value = el.name;
            document.querySelector(".email").value = el.gmail;
            document.querySelector(".avatar").value = el.avatar;
            addModal.showModal();
        };

        let infoBtn = document.createElement("button");
        infoBtn.innerText = "Info";
        infoBtn.onclick = () => infoUser(el);

        tdActions.append(editBtn, deleteBtn, infoBtn);

        tr.append(tdavatar, td1, td2, tdStatus, tdActions);
        box.append(tr);
    });
}



add.onclick = () => {
    currentId = null;
    addModal.showModal();
};

closeBtn.onclick = () => addModal.close();
addBtn.onclick = saveUser;
document.querySelector("#back").onclick = () => infoModal.close();

getData();
