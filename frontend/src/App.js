import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Jugador from './Jugador';
import AgregarJugador from './AgregarJugador';
import EditarJugador from './EditarJugador';
import Goleadores from './Goleadores';
import Amonestados from './Amonestados';
import Asistidores from './Asistidores';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Jugador/>}></Route>
        <Route path = '/AgregarJugador' element = {<AgregarJugador/>}></Route>
        <Route path ='/Editar/:id' element ={<EditarJugador/>}></Route>
        <Route path='/Amonestados' element={<Amonestados></Amonestados>}></Route>
        <Route path='Asistidores' element={<Asistidores></Asistidores>}></Route>
        <Route path='Goleadores' element={<Goleadores></Goleadores>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
