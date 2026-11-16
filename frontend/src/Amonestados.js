import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Link } from "react-router-dom";
import './App.css';
import "country-flag-icons/3x2/flags.css";

import logo from './logoLiga1.jpg';

function Amonestados() {

  const [amonestado, setAmonestado] = useState([])
    const [error, setError] = useState('')

    useEffect(() =>{
      axios.get('http://localhost:8081/Amonestados')
      .then(res => setAmonestado(res.data))
    .catch(err => console.log(err));
    },
    [])
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
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel"> <img src={logo} alt="Logo" width="35" height="35" class="d-inline-block align-text-top me-2 "/>Liga 1 - Amonestados</h5>
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
       <nav aria-label="breadcrumb" className="ms-3 mt-2">
  <ol className="breadcrumb">
    <li className="breadcrumb-item">
      <a className="breadcrumb-link mx-2 text-decoration-none" href="/">Lista de jugadores</a>
    </li>
    <li className="breadcrumb-divider">  / </li>
    <li className="breadcrumb-item" aria-current="page">
      <a className="breadcrumb-link active mx-2 text-decoration-none" href="#">Amonestados</a>
    </li>
  </ol>
</nav>
       <div className="m-1 p-3">
  <h2 className="text-center">Lista de amonestados</h2>
  <div className="pt-2">
  <div className="x justify-content-center align-items-center text-center mt-2">
  <table className="table table-hover table-bordered border-secondary">
    <thead>
      <th>Nombre</th>
      <th>Equipo</th>
      <th>Tarjetas Amarillas</th>
      <th>Tarjetas Rojas</th>
      <th>Total Tarjetas</th>
    </thead>
    <tbody>
      {amonestado.map((data, i) =>{
        return(
          <tr key={i}>
            <td><b>{data.nombre} {data.apellido} </b><br/> {data.puesto}</td>
            <td>{data.equipo}</td>
            <td>{data.tarjetas_amarillas}</td>
            <td>{data.tarjetas_rojas}</td>
            <td><b>{data.totalTarjetas}</b></td>
          </tr>
        )
      })}
    </tbody>
  </table>
  </div>
  </div>
  </div>
     </div>
  )
}

export default Amonestados;
