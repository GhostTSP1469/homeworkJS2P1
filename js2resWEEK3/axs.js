import { GetUsers, PostUser, EditUser, DeleteUser } from "./api.js";

const box = document.querySelector(".box");
const addBtn = document.querySelector(".addBtn");
const Dialog = document.querySelector(".Dialog");
const Form = document.querySelector(".Form");
const searchInp = document.querySelector(".searchInp");

let currentId = null;



function ShowUser(data) {
  box.innerHTML = "";

  data.forEach((item) => {
    const user = document.createElement("div");

    const name = document.createElement("h2");
    const avatar = document.createElement("img");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    name.innerText = item.name;
    avatar.src = item.avatar;
    avatar.width = 80;

    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";

    editBtn.onclick = () => {
      currentId = item.id;
      Form["name"].value = item.name;
      Form["avatar"].value = item.avatar;
      Dialog.showModal();
    };

    deleteBtn.onclick = async () => {
      await DeleteUser(item.id);
      loadUsers();
    };

    user.append(name, avatar, editBtn, deleteBtn);
    box.append(user);
  });
}



async function loadUsers(search = "") {
  const data = await GetUsers(search);
  ShowUser(data);
}


addBtn.onclick = () => {
  currentId = null;
  Form.reset();
  Dialog.showModal();
};



Form.onsubmit = async (e) => {
  e.preventDefault();

  const user = {
    name: Form["name"].value,
    avatar: Form["avatar"].value,
  };

  if (currentId) {
    user.id = currentId;
    await EditUser(user);
  } else {
    await PostUser(user);
  }

  Dialog.close();
  loadUsers();
};


searchInp.oninput = (e) => {
  loadUsers(e.target.value);
};



loadUsers();