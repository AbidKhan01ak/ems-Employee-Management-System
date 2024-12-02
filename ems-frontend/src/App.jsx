import { useState, useEffect } from 'react'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import { HeaderComponent } from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import DepartmentComponent from './components/DepartmentComponent'
import Switch from './utils/Switch';
import NotFound from './utils/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(null);
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if(savedMode) document.body.classList.add('dark-mode');

  },[]);
  
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', newMode);
  };
  if (darkMode === null) {
    return null; 
  }
  return (
    <>
    <BrowserRouter>
    <div
      style={{position: 'absolute', top: '10%', right: '2%', zIndex: 1000,}}>
        <Switch 
        isOn={darkMode} 
        handleToggle={toggleDarkMode}
        colorOne= "#FFEB00"
        colorTwo="#000000"
        />
    </div>
      <HeaderComponent/>
      <Routes>
        <Route path='/' element={ <ListEmployeeComponent/> } />
        <Route path='/employees' element={ <ListEmployeeComponent/> }/>
        <Route path='/add-employee' element={<EmployeeComponent />}/>
        <Route path='/edit-employee/:id' element={<EmployeeComponent />}/>

        <Route path='/departments' element={<ListDepartmentComponent/>}/>
        <Route path='/add-department' element={<DepartmentComponent/>}/>
        <Route path='/edit-department/:id' element={<DepartmentComponent/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
