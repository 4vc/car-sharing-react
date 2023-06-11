import {useEffect, useState} from 'react';
import Header from '../../header/Header.jsx';
import Button from '../../button/Button.jsx';
import orderService from '../../../services/OrderService.js';
import statusService from '../../../services/StatusService.js';

const EditOrder = () => {
  const [order, setOrder] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    const url = window.location.href.split('/');
    const id = url[url.length - 2];

    orderService.getById(id).then(
      orderResponse => setOrder(orderResponse.data)
    ).catch(error => console.error('Error fetching order data:', error))
  }, []);

  useEffect(() => {
    statusService.getAll().then(
      statusResponse => setStatuses(statusResponse.data)
    ).catch(error => console.error('Error fetching statuses data:', error))
  }, []);

  useEffect(() => {
    setSelectedStatus(order?.idStatus || '');
  }, [order]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateClick = (event) => {
    event.preventDefault();

    statusService.getById(selectedStatus)
      .then(statusResponse => {
        order.idStatus = statusResponse.data.id;
        orderService.update(order.id, order);
        window.location.href = `/admin/orders/${order.id}`;
      }).catch(error => console.error('Error fetching status data:', error));
  };

  const handleCancelClick = () => {
    window.location.href = `/admin/orders/${order.id}`;
  };

  return (
    <div>
      <Header/>
      {selectedStatus && (<form>
          <label htmlFor="status">Change Status:</label>
          <select id="status"
                  defaultValue={selectedStatus}
                  onChange={handleStatusChange}
          >
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </form>
      )}
      <Button onClick={handleUpdateClick} text={'Update'}/>
      <Button onClick={handleCancelClick} text={'Cancel'}/>
    </div>);
};

export default EditOrder;
