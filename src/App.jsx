import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/home/Homepage.jsx';
import SignIn from './components/sign-in/SignIn.jsx';
import SignUp from './components/sign-up/SignUp.jsx';
import Order from './components/order/Order.jsx';
import Admin from './components/admin/Admin.jsx';
import ShowAdminCars from './components/cars/show-admin-cars/ShowAdminCars.jsx';
import AddCar from './components/cars/add-car/AddCar.jsx';
import PageNotFound from './components/page-not-found/PageNotFound.jsx';

let routes = (
  <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/order' element={<Order/>}/>
    <Route path='*' element={<PageNotFound/>}/>
  </Routes>
);

if (localStorage.getItem('adminId')) {
  routes = (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/cars' element={<ShowAdminCars/>}/>
      <Route path='/cars/add' element={<AddCar/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  );
}

const App = () => {
  return (
    <Router>
      {routes}
    </Router>
  );
};

export default App;
