class UserApp {
  constructor() {
    this.url = "http://localhost:3001/users";
    this.box = document.getElementById("userBox");
    this.modal = document.getElementById("userModal");
    this.form = document.getElementById("userForm");
    this.addBtn = document.getElementById("addBtn");
    this.closeBtn = document.getElementById("closeModal");

    this.currentId = null;

    this.init();
  }

  init() {
    this.loadUsers();
    this.addBtn.onclick = () => this.openModal();
    this.closeBtn.onclick = () => this.modal.close();
    this.form.onsubmit = (e) => this.handleSubmit(e);
  }

  async loadUsers() {
    const res = await fetch(this.url);
    const data = await res.json();
    this.render(data);
  }

  render(users) {
    this.box.innerHTML = "";

    users.forEach(user => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td class="${user.status ? "online" : "offline"}">
          ${user.status ? "Online" : "Offline"}
        </td>
        <td>
          <button class="toggle">Toggle</button>
          <button class="delete">Delete</button>
        </td>
      `;

      tr.querySelector(".toggle").onclick = () =>
        this.toggleStatus(user);

      tr.querySelector(".delete").onclick = () =>
        this.deleteUser(user.id);

      this.box.append(tr);
    });
  }

  openModal(user = null) {
    this.modal.showModal();

    if (user) {
      this.currentId = user.id;
      this.form.name.value = user.name;
      this.form.email.value = user.email;
    } else {
      this.currentId = null;
      this.form.reset();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const userData = {
      name: this.form.name.value,
      email: this.form.email.value,
      status: true
    };

    if (this.currentId) {
      await fetch(`${this.url}/${this.currentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
    } else {
      await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
    }

    this.modal.close();
    this.loadUsers();
  }

  async deleteUser(id) {
    await fetch(`${this.url}/${id}`, {
      method: "DELETE"
    });
    this.loadUsers();
  }

  async toggleStatus(user) {
    await fetch(`${this.url}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...user,
        status: !user.status
      })
    });
    this.loadUsers();
  }
}

new UserApp();