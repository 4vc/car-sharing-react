import axios from 'axios';

const ORDER_API_BASE_URL = 'http://localhost:8080/orders';

class OrderService {
  getAll() {
    return axios.get(ORDER_API_BASE_URL);
  }

  getById(id) {
    return axios.get(ORDER_API_BASE_URL + '/' + id);
  }

  save(order) {
    return axios.post(ORDER_API_BASE_URL, order);
  }

  update(id, order) {
    return axios.put(ORDER_API_BASE_URL + '/' + id, order);
  }

  delete(id) {
    return axios.delete(ORDER_API_BASE_URL + '/' + id);
  }
}

export default new OrderService();
