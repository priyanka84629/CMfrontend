import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom' 
import Login from './components/log/Login';
import Signup from './components/log/Signup';
import Main from './components/Main/Main'
// import ImportFile from './components/ImportFile';
import ProtectedRoutes from './components/protectedRoutes';
const App=()=> {
 return(
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/signup' element={<Signup/>}/>
    <Route element={<ProtectedRoutes/>}>
    <Route path='/main' element={<Main/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
  </>
 )
}

export default App;
