import axios from 'axios';

const STATUS_API_BASE_URL = 'http://localhost:8080/api/v1/statuses';

class StatusService {
  getAll() {
    return axios.get(STATUS_API_BASE_URL);
  }

  getById(id) {
    return axios.get(STATUS_API_BASE_URL + '/' + id);
  }

  save(status) {
    return axios.post(STATUS_API_BASE_URL, status);
  }

  update(id, status) {
    return axios.put(STATUS_API_BASE_URL + '/' + id, status);
  }

  delete(id) {
    return axios.delete(STATUS_API_BASE_URL + '/' + id);
  }

  getByName(name) {
    return axios.get(STATUS_API_BASE_URL + '/name/' + name);
  }
}

export default new StatusService();
