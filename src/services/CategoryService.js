import axios from 'axios';

const CATEGORY_API_BASE_URL = 'http://localhost:8080/CATEGORIES';

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
}

export default new CategoryService();
