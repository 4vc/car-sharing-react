import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/admins';

class AdminService {
  getAll() {
    return axios.get(USER_API_BASE_URL);
  }

  getById(id) {
    return axios.get(USER_API_BASE_URL + '/' + id);
  }

  save(user) {
    return axios.post(USER_API_BASE_URL, user);
  }

  update(id, user) {
    return axios.put(USER_API_BASE_URL + '/' + id, user);
  }

  delete(id) {
    return axios.delete(USER_API_BASE_URL + '/' + id);
  }
}

export default new AdminService();
