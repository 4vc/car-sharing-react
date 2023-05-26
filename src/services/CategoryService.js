import axios from 'axios';

const CATEGORY_API_BASE_URL = 'http://localhost:8080/api/v1/categories';

class CategoryService {
  getAll() {
    return axios.get(CATEGORY_API_BASE_URL);
  }

  getById(id) {
    return axios.get(CATEGORY_API_BASE_URL + '/' + id);
  }

  save(category) {
    return axios.post(CATEGORY_API_BASE_URL, category);
  }

  update(id, category) {
    return axios.put(CATEGORY_API_BASE_URL + '/' + id, category);
  }

  delete(id) {
    return axios.delete(CATEGORY_API_BASE_URL + '/' + id);
  }

  getByName(name) {
    return axios.get(CATEGORY_API_BASE_URL + '/name/' + name);
  }
}

export default new CategoryService();
