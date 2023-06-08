import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './components/home/Homepage.jsx';
import SignIn from './components/sign-in/SignIn.jsx';
import SignUp from './components/sign-up/SignUp.jsx';
import Order from './components/order/Order.jsx';
import Admin from './components/admin/Admin.jsx';
import Startpage from './components/startpage/Startpage.jsx';
import AdminCars from './components/cars/admin-cars/AdminCars.jsx';
import AdminCar from './components/cars/admin-car/AdminCar.jsx';
import EditCar from './components/cars/edit-car/EditCar.jsx';
import AddCar from './components/cars/add-car/AddCar.jsx';
import CarsList from './components/cars-list/CarsList.jsx';
import PageNotFound from './components/page-not-found/PageNotFound.jsx';

let routes = (
  <Routes>
     <Route path='/' element={<Startpage/>}/>
    <Route path='/homepage' element={<Homepage/>}/>
    <Route path="/cars/:stationId" component={CarsList} />
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/order' element={<Order/>}/>
    <Route path='*' element={<PageNotFound/>}/>
  </Routes>
);

if (localStorage.getItem('adminId')) {
  routes = (
    <Routes>
      <Route path='/' element={<Startpage/>}/>
      <Route path='/homepage' element={<Homepage/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path="/cars/:stationId" component={CarsList} />
      <Route path='/admin/cars' element={<AdminCars/>}/>
      <Route path='/admin/cars/:id' element={<AdminCar/>}/>
      <Route path='/admin/cars/:id/edit' element={<EditCar/>}/>
      <Route path='/admin/cars/add' element={<AddCar/>}/>
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
