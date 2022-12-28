
import React from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import Movie from './Compo/Movie'
import Description from './Compo/Description'

export default function App() {
  return (
    <div>
     
      <Router>
        <Link to='/'><i className="fa fa-arrow-left"></i></Link>
      
        <Routes>
          <Route path='/' element={<Movie/>}/>
          <Route path='/:id' element={<Description/>}/>
        </Routes>
       </Router>
     </div>
   )
 }

