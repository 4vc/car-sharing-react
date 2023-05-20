import axios from 'axios';

const CLIENT_CATEGORY_API_BASE_URL = 'http://localhost:8080/client-categories';

class ClientCategoryService {
  getAll() {
    return axios.get(CLIENT_CATEGORY_API_BASE_URL);
  }

  getById(id) {
    return axios.get(CLIENT_CATEGORY_API_BASE_URL + '/' + id);
  }

  save(clientCategory) {
    return axios.post(CLIENT_CATEGORY_API_BASE_URL, clientCategory);
  }

  update(id, clientCategory) {
    return axios.put(CLIENT_CATEGORY_API_BASE_URL + '/' + id, clientCategory);
  }

  delete(id) {
    return axios.delete(CLIENT_CATEGORY_API_BASE_URL + '/' + id);
  }
}

export default new ClientCategoryService();
