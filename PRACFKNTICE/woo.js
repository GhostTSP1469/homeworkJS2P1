let box=document.querySelector(".box")
export{box}
import {addModal, addForm, getUsers, url } from "./woo2.js"
import {infoModal,cancel,addBtn,closeAdd,deleteSelectedBtn,selectedIds,currentId} from "./woo2.js"



addBtn.onclick = () => {
  addForm.reset();
  addModal.showModal();
};



closeAdd.onclick = () => {
  addModal.close();
};



async function addUser(user) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
}



cancel.onclick = () => infoModal.close();




addForm.onsubmit = async (e) => {
  e.preventDefault();

  let userData = {
    name: addForm["name"].value,
    avatar: addForm["avatar"].value,
    salary: Number(addForm["salary"].value),
    age: new Date(addForm["age"].value).toISOString(),
    status: addForm["status"].value === "true",
    createdAt: new Date().toISOString()
  };

  if (currentId) {
    await fetch(`${url}/${currentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
    currentId = null;
  } else {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
  }

  addModal.close();
  addForm.reset();
  getUsers();
};

addForm.onsubmit = async (e) => {
  e.preventDefault();

  let newUser = {
    name: addForm["name"].value,
    avatar: addForm["avatar"].value,
    salary: Number(addForm["salary"].value),
    age: new Date(addForm["age"].value).toISOString(),
    status: addForm["status"].value === "true",
    createdAt: new Date().toISOString()
  };

  await addUser(newUser);

  addModal.close();
  addForm.reset();

  getUsers(); 
};





deleteSelectedBtn.onclick = async () => {
  for (let id of selectedIds) {
    await fetch(`${url}/${id}`, { method: "DELETE" });
  }

  selectedIds = [];
  getUsers();
};








getUsers()
