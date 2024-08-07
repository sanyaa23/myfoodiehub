import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div><Home /></div>} />
          <Route path="/login" element={<div ><Login /></div>} />
          <Route path="/createuser" element={<div><SignUp /></div>} />
          <Route path="/myorder" element={<div><MyOrder /></div>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}


export default App;
