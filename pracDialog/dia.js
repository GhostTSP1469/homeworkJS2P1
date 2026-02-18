let url = "https://69665b0ff6de16bde44d2217.mockapi.io/zapper";

let box = document.querySelector(".box");
let add = document.querySelector(".addBtn");
let addModal = document.querySelector(".addModal");
let closeBtn = document.querySelector(".closeB");
let addBtn = document.querySelector(".addB");

let currentId = null; 


async function getData() {
    try {
        let res = await fetch(url);
        let data = await res.json();
        showData(data);
    } catch (error) {
        console.log(error);
    }
}


async function deleteUser(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
        getData();
    } catch (error) {
        console.log(error);
    }
}


async function saveUser() {
    let name = document.querySelector(".name").value;
    let gmail = document.querySelector(".email").value;
    let avatar = document.querySelector(".avatar").value;

    let userObj = {
        name,
        gmail,
        avatar
    };

    try {

        if (currentId) {
            
            await fetch(`${url}/${currentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userObj)
            });
        } else {
            
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userObj)
            });
        }

        addModal.close();
        document.querySelector(".name").value = "";
        document.querySelector(".email").value = "";
        document.querySelector(".avatar").value = "";
        currentId = null;

        getData();

    } catch (error) {
        console.log(error);
    }
}

function showData(data) {
    box.innerHTML = "";

    data.forEach((el) => {

        let tr = document.createElement("tr");

        let tdavatar = document.createElement("td");
        tdavatar.innerHTML = `<img src="${el.avatar}" style="width:50px; height:50px; border-radius:50%;">`;

        let td1 = document.createElement("td");
        td1.innerText = el.name;

        let td2 = document.createElement("td");
        td2.innerText = el.gmail;

        let tdActions = document.createElement("td");
let tdStatus = document.createElement("td");
        tdStatus.innerText = el.status ? "Active" : "Inactive";
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
if (el.status) {
            tdStatus.style.color = "green";
        } else {
            tdStatus.style.color = "red";
        }
        let editBtn = document.createElement("button");
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = el.status;
         
        editBtn.innerText = "Edit";

        deleteBtn.onclick = () => deleteUser(el.id);
checkBox.onchange=()=>{
            fetch(`${url}/${el.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...el, status: checkBox.checked })
            }).then(() => getData());
        }
        editBtn.onclick = () => {
            currentId = el.id;
            document.querySelector(".name").value = el.name;
            document.querySelector(".email").value = el.gmail;
            document.querySelector(".avatar").value = el.avatar;
            addModal.showModal();
        };
        
tdStatus.appendChild(checkBox);
        tdActions.append(editBtn, deleteBtn);
        tr.append(tdavatar, td1, td2, tdStatus, tdActions);
        box.append(tr);
    });
}


add.onclick = () => {
    currentId = null;
    addModal.showModal();
};

closeBtn.onclick = () => {
    addModal.close();
};

addBtn.onclick = saveUser;

getData();
