let data = [
  { id: 1, avatar: "https://i.pravatar.cc/150?img=1", company: "TechNova", name: "Alex Johnson", work: "Frontend Developer", status: "Active" },
  { id: 2, avatar: "https://i.pravatar.cc/150?img=2", company: "CodeCraft", name: "Maria Lopez", work: "UI/UX Designer", status: "Active" },
  { id: 3, avatar: "https://i.pravatar.cc/150?img=3", company: "DataWave", name: "Ivan Petrov", work: "Backend Developer", status: "Inactive" }
];

const preVoid = document.querySelector(".preVoid");
const addBtn = document.querySelector(".add");


const modal = document.querySelector(".addModal");
const saveBtn = document.querySelector(".addButton");
const cancelBtn = document.querySelector(".cancelButton");

const nameInp = document.getElementById("name");
const jobInp = document.getElementById("job");
const companyInp = document.getElementById("companyy");

let editId = null;


function showUser() {
  preVoid.innerHTML = "";

  data.forEach(el => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = el.avatar;
    img.className = "avatarUser";

    const name = document.createElement("h3");
    name.textContent = el.name;

    const work = document.createElement("p");
    work.textContent = el.work;

    const company = document.createElement("p");
    company.textContent = el.company;

    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = el.status === "Active";

    const statusText = document.createElement("span");
    statusText.textContent = el.status;
    statusText.style.color = el.status === "Active" ? "green" : "red";

    checkbox.onchange = () => {
      toggleStatus(el.id, checkbox.checked);
    };

    label.append(checkbox, statusText);

    
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.onclick = () => openEditModal(el.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.onclick = () => deleteUser(el.id);

    card.append(img, name, work, company, label, editBtn, deleteBtn);
    preVoid.append(card);
  });

  styleCards();
}


function deleteUser(id) {
  data = data.filter(el => el.id !== id);
  showUser();
}

function toggleStatus(id, checked) {
  data = data.map(el =>
    el.id === id
      ? { ...el, status: checked ? "Active" : "Inactive" }
      : el
  );
  showUser();
}


addBtn.onclick = () => {
  editId = null;
  clearModal();
  modal.showModal();
};

function openEditModal(id) {
  const user = data.find(el => el.id === id);
  if (!user) return;

  nameInp.value = user.name;
  jobInp.value = user.work;
  companyInp.value = user.company;

  editId = id;
  modal.showModal();
}

saveBtn.onclick = () => {
  if (!nameInp.value || !jobInp.value || !companyInp.value) return;

  if (editId === null) {
    data.push({
      id: Date.now(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      name: nameInp.value,
      work: jobInp.value,
      company: companyInp.value,
      status: "Active"
    });
  } else {
    data = data.map(el =>
      el.id === editId
        ? { ...el, name: nameInp.value, work: jobInp.value, company: companyInp.value }
        : el
    );
    editId = null;
  }

  modal.close();
  clearModal();
  showUser();
};

cancelBtn.onclick = () => {
  modal.close();
  clearModal();
};

function clearModal() {
  nameInp.value = "";
  jobInp.value = "";
  companyInp.value = "";
}


function styleCards() {
  preVoid.style.display = "flex";
  preVoid.style.gap = "30px";
  preVoid.style.flexWrap = "wrap";

  document.querySelectorAll(".card").forEach(card => {
    card.style.background = "skyblue";
    card.style.borderRadius = "15px";
    card.style.padding = "10px";
    card.style.width = "220px";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.gap = "8px";
  });

  document.querySelectorAll(".avatarUser").forEach(img => {
    img.style.width = "100%";
    img.style.borderRadius = "15px 15px 0 0";
  });
}


showUser();
