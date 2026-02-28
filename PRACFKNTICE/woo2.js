export let url = "http://localhost:3001/users";

let addBtn = document.querySelector(".addBtn");
export let addModal = document.querySelector(".addModal");
let addForm = document.querySelector(".addForm");
let closeAdd = document.querySelector(".closeAdd");





let box = document.querySelector(".box");
let infoModal = document.querySelector(".infoModal");
let cancel = document.querySelector(".cancel");

let searchInp = document.querySelector(".searchInp");
let sortSelect = document.querySelector(".sortSelect");
let deleteSelectedBtn = document.querySelector(".deleteSelected");



let selectedIds = [];
let currentId = null;




async function getUsers() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    showUsers(data);
  } catch (error) {
    console.log(error);
  }
}




export function calculateAge(dateString) {
  return new Date().getFullYear() - new Date(dateString).getFullYear();
}




function showUsers(users) {
  box.innerHTML = "";

  users.forEach(el => {

    let tr = document.createElement("tr");

    
    let tdCheckbox = document.createElement("td");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.onchange = () => {
      if (checkbox.checked) {
        selectedIds.push(el.id);
      } else {
        selectedIds = selectedIds.filter(id => id !== el.id);
      }
    };

    tdCheckbox.append(checkbox);

   
    let tdAvatar = document.createElement("td");
    let img = document.createElement("img");
    img.src = el.avatar;
    img.style.width = "60px";
    img.style.borderRadius = "10px";
    tdAvatar.append(img);

   
    let tdName = document.createElement("td");
    tdName.innerText = el.name;

   
    let tdSalary = document.createElement("td");
    tdSalary.innerText = el.salary;

 
    let tdAge = document.createElement("td");
    tdAge.innerText = calculateAge(el.age);

  
    let tdStatus = document.createElement("td");
    tdStatus.innerText = el.status ? "In Stock" : "Out of Stock";
    tdStatus.style.color=`${el.status?"green":"red"}`

 
    let tdActions = document.createElement("td");

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";

    let editBtn = document.createElement("button");
    editBtn.innerText = "⚙️";

    let infoBtn = document.createElement("button");
    infoBtn.innerText = "🪪";

    deleteBtn.onclick = async () => {
      await fetch(`${url}/${el.id}`, { method: "DELETE" });
      getUsers();
    };

    editBtn.onclick = () => {
      currentId = el.id;
      addModal.showModal();

      addForm["name"].value = el.name;
      addForm["avatar"].value = el.avatar;
      addForm["salary"].value = el.salary;
      addForm["age"].value = el.age.split("T")[0];
      addForm["status"].value = el.status.toString();
    };

    infoBtn.onclick = () => {
      infoModal.showModal();
      showInfo(el);
    };

    tdActions.append(deleteBtn, editBtn, infoBtn);

    tr.append(
      tdCheckbox,
      tdAvatar,
      tdName,
      tdSalary,
      tdAge,
      tdStatus,
      tdActions
    );

    box.append(tr);
  });
}



function showInfo(user) {
  document.querySelector(".infoAvatar").src = user.avatar;
  document.querySelector(".infoName").innerText = `Name: ${user.name}`;
  document.querySelector(".infoSalary").innerText = `Salary: ${user.salary}`;
  document.querySelector(".infoAge").innerText = `Age: ${calculateAge(user.age)}`;
}

cancel.onclick = () => infoModal.close();









searchInp.oninput = async (e) => {
  let value = e.target.value.toLowerCase();

  let response = await fetch(url);
  let data = await response.json();

  let filtered = data.filter(user =>
    user.name.toLowerCase().includes(value)
  );

  showUsers(filtered);
};




sortSelect.onchange = async (e) => {
  let value = e.target.value;

  let response = await fetch(url);
  let data = await response.json();

  if (value === "salaryAsc") {
    data.sort((a, b) => a.salary - b.salary);
  }

  if (value === "salaryDesc") {
    data.sort((a, b) => b.salary - a.salary);
  }

  if (value === "ageAsc") {
    data.sort((a, b) => calculateAge(a.age) - calculateAge(b.age));
  }

  if (value === "ageDesc") {
    data.sort((a, b) => calculateAge(b.age) - calculateAge(a.age));
  }

  showUsers(data);
};







export{getUsers}
export { box,infoModal,cancel,addBtn,closeAdd,deleteSelectedBtn,selectedIds,currentId,addForm };