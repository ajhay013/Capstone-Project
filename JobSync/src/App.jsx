import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'

import SampleUser from './components/SampleUser'
import CreateUser from './components/CreateUser'

function App() {

  return (
    <>
      <div className="App">
          <h3>EXAMPLE FOR THE DATABASE</h3>
      
     <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to="user/create">Create</Link>
            </li>
          </ul>
        </nav>
          <Routes>
            <Route index element={<SampleUser />} />
            <Route path="user/create" element={<CreateUser />} />
          </Routes>
     </BrowserRouter>
     </div>
    </>
  )
}

export default App
