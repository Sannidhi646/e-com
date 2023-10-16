
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
    
     
   <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/add-product' element={<AddProduct/>}/>
      <Route path='/update/:id' element={<UpdateProduct/>}/>
     
      <Route path='/profile' element={<h1>Profile</h1>}/>
      </Route>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
   </Routes>
    
   </BrowserRouter>
   <Footer/>
    </div>
  );
}

export default App;
