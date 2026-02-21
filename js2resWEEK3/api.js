const API = "https://6697657702f3150fb66d72df.mockapi.io/users";

async function GetUsers(search = "") {
  try {
    const response = await axios.get(
      search ? `${API}?name=${search}` : API
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function PostUser(user) {
  try {
    await axios.post(API, user);
  } catch (error) {
    console.log(error);
  }
}

async function EditUser(user) {
  try {
    await axios.put(`${API}/${user.id}`, user);
  } catch (error) {
    console.log(error);
  }
}

async function DeleteUser(id) {
  try {
    await axios.delete(`${API}/${id}`);
  } catch (error) {
    console.log(error);
  }
}

export { GetUsers, PostUser, EditUser, DeleteUser };