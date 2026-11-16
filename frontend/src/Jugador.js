import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link } from "react-router-dom";
import './App.css';
import "country-flag-icons/3x2/flags.css";

import logo from './logoLiga1.jpg';

function Jugador() {

  const [jugador, setJugador] = useState([])
  const [error, setError] = useState('')
  useEffect(()=>{
    axios.get('http://localhost:8081/')
    .then(res => setJugador(res.data))
    .catch(err => console.log(err));
  },
[])

const handleDelete = async (id, nombre, apellido) => {
  if (!window.confirm(`¡Desea eliminar a ${nombre} ${apellido}?`)) {
    return
  }

  try{
    await axios.delete('http://localhost:8081/jugador/' + id)
    setJugador(jugador.filter(data => data.id !== id))
    setError('')
  }catch(err){
    console.error('Error borrando jugador:', err)
    setError('No se pudo eliminar al jugador')
  }
}


  return (
    
  <div className="fondo w-100 vh-100 justify-content-center align-items-center">

<nav className="navbar bg-body-tertiary d-none d-lg-block">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      <img src={logo} alt="Logo" width="35" height="35" class="d-inline-block align-text-top me-2 "/>
      Logo
    </a>
    <ul className="nav justify-content-end">
  <li className="nav-item">
    <a className="nav-link" aria-current="page" href="/">Jugadores</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/Goleadores">Goleadores</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/Asistidores">Asistidores</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/Amonestados">Amonestados</a>
  </li>
</ul>
  </div>
</nav>


<div className="d-md-block d-lg-none"> 
<nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src={logo} alt="Logo" width="35" height="35" class="d-inline-block align-text-top me-2 "/>Liga 1</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel"> <img src={logo} alt="Logo" width="35" height="35" class="d-inline-block align-text-top me-2 "/>Liga 1 - Jugadores</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Jugadores - Pagina Principal</a>
          </li>
          <li className="nav-item">
            <a class="nav-link" href="/Goleadores">Goleadores</a>
          </li>
           <li className="nav-item">
            <a class="nav-link" href="/Asistidores">Asistidores</a>
          </li>
           <li className="nav-item">
            <a class="nav-link" href="/Amonestados">Amonestados</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</div>
  <div className="m-1 p-3">
  <h2 className="text-center">Lista de jugadores</h2>

  <div className="pt-2">
  <Link to='/AgregarJugador'> <button className="btn btn-success">Agregar <i className="bi bi-person-fill-add ms-1"></i></button></Link>

  <div className="x justify-content-center align-items-center text-center mt-2">
  <table className="table table-hover table-bordered border-secondary ">
    <thead>
      <th>Nombre</th>
      <th>Equipo</th>
      <th>Goles</th>
      <th>Asistencias</th>
      <th>Puesto</th>
      <th>Edad</th>
      <th>País</th>
      <th>T. Amarillas</th>
      <th>T.Rojas</th>
      <th>Partidos</th>
      <th>Minutos</th>
      <th></th>
    </thead>
    <tbody>
      {
      jugador.map((data, i) => {
        return(
          <tr key={i}>
             <td> {data.nombre}  {data.apellido}</td>
             <td>{data.equipo}</td>
             <td>{data.goles}</td>
             <td>{data.asistencias}</td>
             <td>{data.puesto}</td>
             <td>{data.edad}</td>
             <td>
              <span>
              {data.pais}</span>{data.codigo_pais && (<span className={`flag:${data.codigo_pais} ms-2 `} aria-label={`Bandera de ${data.pais}`}
              style={{fontSize: "1.1 em"}}
              ></span>)} 
              </td>
             <td>{data.tarjetas_amarillas}</td>
             <td>{data.tarjetas_rojas}</td>
             <td>{data.partidos_jugados}</td>
             <td>{data.minutos_jugados}</td>
             <td>
              <Link to={`/Editar/${data.id}`}> <button className="btn btn-primary mx-1 p-1 px-2">Editar <i className="bi bi-pencil ms-1" ></i></button></Link>

              <button className="btn btn-danger mx-1 p-1 px-1.5 " onClick={()=> handleDelete(data.id, data.nombre, data.apellido)}>Eliminar <i className="bi bi-trash3 ms-1"></i></button>
             </td>

          </tr>
        );
      })
      }
    </tbody>
  </table>
  </div>
  </div>
  </div>

  </div>
  )
}

export default Jugador;
