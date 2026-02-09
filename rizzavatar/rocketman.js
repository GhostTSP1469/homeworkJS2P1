let data = [
  { id: 1, avatar: "https://i.pravatar.cc/150?img=1", company: "TechNova", name: "Alex Johnson", work: "Frontend Developer" },
  { id: 2, avatar: "https://i.pravatar.cc/150?img=2", company: "CodeCraft", name: "Maria Lopez", work: "UI/UX Designer" },
  { id: 3, avatar: "https://i.pravatar.cc/150?img=3", company: "DataWave", name: "Ivan Petrov", work: "Backend Developer" },
  { id: 4, avatar: "https://i.pravatar.cc/150?img=4", company: "CloudCore", name: "Sara Kim", work: "DevOps Engineer" }
];

const preVoid = document.querySelector(".preVoid");

function showUser() {
  preVoid.innerHTML = "";

  data.forEach(el => {
    preVoid.innerHTML += `
      <div class="card">
        <img src="${el.avatar}" class="avatarUser" width="100%">
        <p>${el.work}</p>
        <h3>${el.name}</h3>
        <p>${el.company}</p>
        <button class="deleteBtn" data-id="${el.id}">delete</button>
      </div>
    `;
  });

  addDeleteHandlers();
  styleCards();
}

function addDeleteHandlers() {
  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      deleteUser(id);
    };
  });
}

function deleteUser(id) {
  data = data.filter(el => el.id !== id);
  showUser();
}

function styleCards() {
  preVoid.style.display = "flex";
  preVoid.style.gap = "40px";
  preVoid.style.flexWrap = "wrap";

  document.querySelectorAll(".card").forEach(card => {
    card.style.backgroundColor = "skyblue";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.gap = "10px";
    card.style.borderRadius = "20px";
  });

  document.querySelectorAll(".avatarUser").forEach(img => {
    img.style.borderRadius = "20px 20px 0 0";
  });
}

showUser();

const newBtn = document.querySelector(".add");
const addModal = document.querySelector(".addModal");
const addButton = document.querySelector(".addButton");
const cancelButton = document.querySelector(".cancelButton");

newBtn.onclick = () => {
  addModal.showModal();
  
}

cancelButton.onclick = () => {
  addModal.close();
  
}

addButton.onclick = () => {
  const job = document.getElementById("job").value;
  const name = document.getElementById("name").value;
  const companyy = document.getElementById("companyy").value;
addModal.close();
  const newUser = {
    id: Date.now(),
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    company: companyy,
    name: name,
    work: job
  };
  data.push(newUser);
  showUser();
} 