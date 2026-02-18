let url = "https://69665b0ff6de16bde44d2217.mockapi.io/zapper";

let box = document.querySelector(".box");

let modal = document.getElementById("modal");
let modalName = document.getElementById("modalName");
let saveBtn = document.getElementById("saveBtn");
let closeBtn = document.getElementById("closeBtn");

let currentEditId = null;



async function getZappers() {
  let response = await fetch(url);
  let data = await response.json();
  showZappers(data);
}



async function deleteUser(id) {
  let confirmDelete = confirm("Are you sure you want to delete this user?");

  if (!confirmDelete) return;

  await fetch(`${url}/${id}`, {
    method: "DELETE"
  });

  getZappers();
}



async function updateUser(id, newName) {
  await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: newName
    })
  });

  closeModal();
  getZappers();
}



function showZappers(data) {
  box.innerHTML = "";

  data.forEach(item => {
    let div = document.createElement("div");

    div.innerHTML = `
      <img src="${item.avatar}" width="100">
      <h3>${item.name}</h3>
      <button onclick="deleteUser('${item.id}')">Delete</button>
      <button onclick="openModal('${item.id}', '${item.name}')">Edit</button>
    `;

    div.style.border = "1px solid black";
    div.style.margin = "10px";
    div.style.padding = "10px";

    box.append(div);
  });
}



function openModal(id, name) {
  currentEditId = id;
  modalName.value = name;
  modal.style.display = "flex";
}



function closeModal() {
  modal.style.display = "none";
  modalName.value = "";
  currentEditId = null;
}



saveBtn.onclick = () => {
  if (!modalName.value.trim()) return;
  updateUser(currentEditId, modalName.value);
};



closeBtn.onclick = closeModal;



modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};


getZappers();

