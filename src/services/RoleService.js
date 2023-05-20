import axios from 'axios';

const ROLE_API_BASE_URL = 'http://localhost:8080/roles';

class RoleService {
  getAll() {
    return axios.get(ROLE_API_BASE_URL);
  }

  getById(id) {
    return axios.get(ROLE_API_BASE_URL + '/' + id);
  }

  save(role) {
    return axios.post(ROLE_API_BASE_URL, role);
  }

  update(id, role) {
    return axios.put(ROLE_API_BASE_URL + '/' + id, role);
  }

  delete(id) {
    return axios.delete(ROLE_API_BASE_URL + '/' + id);
  }
}

export default new RoleService();
