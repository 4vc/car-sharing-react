import axios from 'axios';

const ADMIN_API_BASE_URL = 'http://localhost:8080/admins';

class AdminService {
  getAll() {
    return axios.get(ADMIN_API_BASE_URL);
  }

  getById(id) {
    return axios.get(ADMIN_API_BASE_URL + '/' + id);
  }

  save(admin) {
    return axios.post(ADMIN_API_BASE_URL, admin);
  }

  update(id, admin) {
    return axios.put(ADMIN_API_BASE_URL + '/' + id, admin);
  }

  delete(id) {
    return axios.delete(ADMIN_API_BASE_URL + '/' + id);
  }
}

export default new AdminService();
