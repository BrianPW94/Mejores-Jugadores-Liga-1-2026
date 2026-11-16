import React, { useEffect, useState } from "react";
import './App.css'
import "country-flag-icons/3x2/flags.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
function EditarJugador() {

  const[nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [equipo, setEquipo] = useState('');
  const [goles, setGoles] = useState('');
  const [asistencias, setAsistencias] = useState('');
  const [puesto, setPuesto] = useState('');
  const [edad, setEdad] = useState('');
  const [pais, setPais] = useState('');
  const [codigoPais, setCodigo_Pais] = useState('');
  const[tarjetas_amarillas, setTarjetas_amarillas] = useState('');
  const[tarjetas_rojas, setTarjetas_rojas] = useState('');
  const[partidos_jugados, setPartidos_jugados] = useState('');
  const[minutos_jugados, setMinutos_jugados] = useState('');
  const[error, setError] = useState('');
  const[cargando, setCargando] = useState(true);
  const[guardando, setGuardando] = useState (false);

  const{id} = useParams();
const navigate = useNavigate();
  
//useEffect para solicitar datos
useEffect(()=>{
   axios.get(`http://localhost:8081/Editar/${id}`)
   .then(res => {
    setNombre(res.data.nombre);
    setApellido(res.data.apellido);
    setEquipo(res.data.equipo);
    setGoles(res.data.goles);
    setAsistencias(res.data.asistencias);
    setPuesto(res.data.puesto);
    setEdad(res.data.edad);
    setCodigo_Pais((res.data.codigo_pais ||  "").toUpperCase());
    setPais(res.data.pais ||  "");
    setTarjetas_amarillas(res.data.tarjetas_amarillas);
    setTarjetas_rojas(res.data.tarjetas_rojas);
    setPartidos_jugados(res.data.partidos_jugados);
    setMinutos_jugados(res.data.minutos_jugados);
   })
   .catch((err) =>{
    console.error("Error cargando jugador:", err);
        setError("No se pudieron cargar los datos del jugador.");
   })
   .finally(() => setCargando(false));
}, {id});


async function handleSubmit(event) {
  event.preventDefault();
  setGuardando(true);
  setError("");
try{
  await axios.put(`http://localhost:8081/Editar/${id}`,{
     nombre,
  apellido,
  equipo,
  goles,
  asistencias,
  puesto,
  edad,
  pais,
  codigo_pais: codigoPais,
  tarjetas_amarillas,
  tarjetas_rojas,
  partidos_jugados,
  minutos_jugados,
  });
  navigate("/");

} catch(err){
  console.error("Error actualizando jugador:", err);
        setError("No se pudo actualizar el jugador. Revise Backend");
}
finally{
  setGuardando(false);
}
}

  return( 
  
  <div className="fondo wh-100 vh-100 p-3 justify-content-center align-items-center">
  <div className="fondo">
  <h2 className="text-center">Agregar jugador</h2>
  <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item">
      <a className="breadcrumb-link mx-2 text-decoration-none" href="/">Lista de jugadores</a>
    </li>
    <li className="breadcrumb-divider">  / </li>
    <li className="breadcrumb-item" aria-current="page">
      <a className="breadcrumb-link active mx-2 text-decoration-none" href="#">Editar Jugador</a>
    </li>
  </ol>
</nav>

<form onSubmit={handleSubmit} className="row g-3 mt-4">
{error && (
  <div className="alert alert-danger" role="alert">{error}</div>
)}

<div id="1" className="col-6">
      <label htmlFor="nombre" className="form-label mb-2 fw-bold">Nombre</label>
      <input 
      id="nombre" 
      type="text" 
      placeholder="Ingresar Nombre" className="form-control" 
      value={nombre}
      onChange={(event) => setNombre(event.target.value)} required></input>
    </div>
    
<div id="6"  className="col-6">
  <label htmlFor="puesto" className="form-label mb-2 fw-bold">Puesto</label>
  <select id="puesto" name="puesto" className="form-select" value={puesto} onChange={(event) => {
    setPuesto(event.target.value);
  }} required>
    <option value="" disabled >Selecciona un puesto</option>
    <option value="Arquero">Arquero</option>
    <option value="Lateral derecho">Lateral derecho</option>
    <option value="Defensa central">Defensa central</option>
  <option value="Lateral izquierdo">Lateral izquierdo</option>
  <option value="Volante defensivo">Volante defensivo</option>
  <option value="Volante central">Volante central</option>
  <option value="Volante derecho">Volante derecho</option>
  <option value="Volante izquierdo">Volante izquierdo</option>
  <option value="Volante ofensivo">Volante Ofensivo</option>
  <option value="Extremo derecho">Extremo derecho</option>
  <option value="Delantero centro">Delantero centro</option>
  <option value="Extremo izquierdo">Extremo izquierdo</option>
  </select>
</div>

<div id="2" className="col-6">
  <label htmlFor="apellido" className="forml-label mb-2 fw-bold">Apellido</label>
  <input id="nombre" type="text" placeholder="Ingresar Apellido" className="form-control" 
  value={apellido}
  onChange={(event)=> setApellido(event.target.value)} required></input>
</div>

<div id="7" className="col-6">
 <label htmlFor="edad" className="form-label mb-2 fw-bold">Edad</label>
 <input id="edad" type="number" placeholder="Edad" className="form-control" value={edad} 
 onChange={(event) => 
 setEdad(event.target.value)} 
 required></input>
</div>

<div id="3" className="col-6">  
   <label htmlFor="equipo" className="form-label mb-2 fw-bold">Equipo</label>
  <select id="equipo"
  className="form-select"
  value={equipo}
  onChange={(event)=> {
    setEquipo(event.target.value);
  } }required>

    <option value=""disabled>Selecciona un equipo</option>
    <option value="ADT">ADT</option>
    <option value="Alianza Atletico">Alianza Atlético</option>
    <option value="Alianza Lima">Alianza Lima</option>
    <option value="Atletico Grau">Atlético Grau</option>
    <option value="Cienciano">Cienciano</option>
    <option value="Comerciantes Unidos">Comerciantes Unidos</option>
    <option value="cusco-fc">Cusco FC</option>
    <option value="Deportivo Garcilaso">Deportivo Garcilaso</option>
    <option value="Deportivo Moquegua">Deportivo Moquegua</option>
    <option value="FBC Melgar">FBC Melgar</option>
    <option value="fC Cajamarca">FC Cajamarca</option>
    <option value="Juan Pablo II College">Juan Pablo II College</option>
    <option value="Los Chankas">Los Chankas</option>
    <option value="Sport Boys">Sport Boys</option>
    <option value="Sport Huancayo">Sport Huancayo</option>
    <option value="Sporting Cristal">Sporting Cristal</option>
    <option value="Universitario">Universitario</option>
    <option value="UTC">UTC</option>
  </select>
</div>

<div id="8" className="col-6">  
  <label htmlFor="pais" className="form-label mb-2 fw-bold">
              País
            </label>
            <select
              id="pais"
              name="pais"
              className="form-select"
              value={codigoPais}
              onChange={(event) => {
                setCodigo_Pais(event.target.value);
                setPais(event.target.selectedOptions[0].text);
              }}
              required
            >
              <option value="" disabled>Selecciona un país</option>
              <option value="AF">Afganistán</option>
              <option value="AL">Albania</option>
              <option value="DE">Alemania</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AG">Antigua y Barbuda</option>
              <option value="SA">Arabia Saudita</option>
              <option value="DZ">Argelia</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaiyán</option>
              <option value="BS">Bahamas</option>
              <option value="BD">Bangladés</option>
              <option value="BB">Barbados</option>
              <option value="BH">Baréin</option>
              <option value="BE">Bélgica</option>
              <option value="BZ">Belice</option>
              <option value="BJ">Benín</option>
              <option value="BY">Bielorrusia</option>
              <option value="MM">Birmania / Myanmar</option>
              <option value="BO">Bolivia</option>
              <option value="BA">Bosnia y Herzegovina</option>
              <option value="BW">Botsuana</option>
              <option value="BR">Brasil</option>
              <option value="BN">Brunéi</option>
              <option value="BG">Bulgaria</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="BT">Bután</option>
              <option value="CV">Cabo Verde</option>
              <option value="KH">Camboya</option>
              <option value="CM">Camerún</option>
              <option value="CA">Canadá</option>
              <option value="QA">Catar</option>
              <option value="TD">Chad</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CY">Chipre</option>
              <option value="VA">Ciudad del Vaticano</option>
              <option value="CO">Colombia</option>
              <option value="KM">Comoras</option>
              <option value="KP">Corea del Norte</option>
              <option value="KR">Corea del Sur</option>
              <option value="CI">Costa de Marfil</option>
              <option value="CR">Costa Rica</option>
              <option value="HR">Croacia</option>
              <option value="CU">Cuba</option>
              <option value="DK">Dinamarca</option>
              <option value="DM">Dominica</option>
              <option value="EC">Ecuador</option>
              <option value="EG">Egipto</option>
              <option value="SV">El Salvador</option>
              <option value="AE">Emiratos Árabes Unidos</option>
              <option value="ER">Eritrea</option>
              <option value="SK">Eslovaquia</option>
              <option value="SI">Eslovenia</option>
              <option value="ES">España</option>
              <option value="US">Estados Unidos</option>
              <option value="EE">Estonia</option>
              <option value="SZ">Eswatini / Suazilandia</option>
              <option value="ET">Etiopía</option>
              <option value="PH">Filipinas</option>
              <option value="FI">Finlandia</option>
              <option value="FJ">Fiyi</option>
              <option value="FR">Francia</option>
              <option value="GA">Gabón</option>
              <option value="GM">Gambia</option>
              <option value="GE">Georgia</option>
              <option value="GH">Ghana</option>
              <option value="GD">Granada</option>
              <option value="GR">Grecia</option>
              <option value="GT">Guatemala</option>
              <option value="GN">Guinea</option>
              <option value="GW">Guinea-Bisáu</option>
              <option value="GQ">Guinea Ecuatorial</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haití</option>
              <option value="HN">Honduras</option>
              <option value="HU">Hungría</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IQ">Irak</option>
              <option value="IR">Irán</option>
              <option value="IE">Irlanda</option>
              <option value="IS">Islandia</option>
              <option value="IL">Israel</option>
              <option value="IT">Italia</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japón</option>
              <option value="JO">Jordania</option>
              <option value="KZ">Kazajistán</option>
              <option value="KE">Kenia</option>
              <option value="KG">Kirguistán</option>
              <option value="KI">Kiribati</option>
              <option value="KW">Kuwait</option>
              <option value="LA">Laos</option>
              <option value="LS">Lesoto</option>
              <option value="LV">Letonia</option>
              <option value="LB">Líbano</option>
              <option value="LR">Liberia</option>
              <option value="LY">Libia</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lituania</option>
              <option value="LU">Luxemburgo</option>
              <option value="MK">Macedonia del Norte</option>
              <option value="MG">Madagascar</option>
              <option value="MY">Malasia</option>
              <option value="MW">Malaui</option>
              <option value="MV">Maldivas</option>
              <option value="ML">Malí</option>
              <option value="MT">Malta</option>
              <option value="MA">Marruecos</option>
              <option value="MU">Mauricio</option>
              <option value="MR">Mauritania</option>
              <option value="MX">México</option>
              <option value="FM">Micronesia</option>
              <option value="MD">Moldavia</option>
              <option value="MC">Mónaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MZ">Mozambique</option>
              <option value="NA">Namibia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NI">Nicaragua</option>
              <option value="NE">Níger</option>
              <option value="NG">Nigeria</option>
              <option value="NO">Noruega</option>
              <option value="NZ">Nueva Zelanda</option>
              <option value="OM">Omán</option>
              <option value="NL">Países Bajos</option>
              <option value="PK">Pakistán</option>
              <option value="PW">Palaos</option>
              <option value="PS">Palestina</option>
              <option value="PA">Panamá</option>
              <option value="PG">Papúa Nueva Guinea</option>
              <option value="PY">Paraguay</option>
              <option value="PE">Perú</option>
              <option value="PL">Polonia</option>
              <option value="PT">Portugal</option>
              <option value="GB">Reino Unido</option>
              <option value="CF">República Centroafricana</option>
              <option value="CZ">República Checa / Chequia</option>
              <option value="CG">República del Congo</option>
              <option value="CD">República Democrática del Congo</option>
              <option value="DO">República Dominicana</option>
              <option value="RW">Ruanda</option>
              <option value="RO">Rumanía</option>
              <option value="RU">Rusia</option>
              <option value="WS">Samoa</option>
              <option value="KN">San Cristóbal y Nieves</option>
              <option value="SM">San Marino</option>
              <option value="VC">San Vicente y las Granadinas</option>
              <option value="LC">Santa Lucía</option>
              <option value="ST">Santo Tomé y Príncipe</option>
              <option value="SN">Senegal</option>
              <option value="RS">Serbia</option>
              <option value="SC">Seychelles</option>
              <option value="SL">Sierra Leona</option>
              <option value="SG">Singapur</option>
              <option value="SY">Siria</option>
              <option value="SO">Somalia</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudán</option>
              <option value="SS">Sudán del Sur</option>
              <option value="SE">Suecia</option>
              <option value="CH">Suiza</option>
              <option value="SR">Surinam</option>
              <option value="TH">Tailandia</option>
              <option value="TW">Taiwán</option>
              <option value="TZ">Tanzania</option>
              <option value="TJ">Tayikistán</option>
              <option value="TL">Timor Oriental</option>
              <option value="TG">Togo</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad y Tobago</option>
              <option value="TN">Túnez</option>
              <option value="TM">Turkmenistán</option>
              <option value="TR">Turquía</option>
              <option value="TV">Tuvalu</option>
              <option value="UA">Ucrania</option>
              <option value="UG">Uganda</option>
              <option value="UY">Uruguay</option>
              <option value="UZ">Uzbekistán</option>
              <option value="VU">Vanuatu</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Vietnam</option>
              <option value="WF">Wallis y Futuna</option>
              <option value="YE">Yemen</option>
              <option value="DJ">Yibuti</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabue</option>
            </select>
            {codigoPais && (
              <div className="mt-2">
                <span
                  className={`flag:${codigoPais}`}
                  aria-label={`Bandera de ${pais}`}
                  style={{ fontSize: "1.5em" }}
                />
                <span className="ms-2">{pais}</span>
              </div>
            )}
</div>

<div id="4" className="col-6">  
  <label htmlFor="goles" className="form-label mb-2 fw-bold">Goles</label>
  <input id="goles"
  type="number"
  placeholder="Goles"
  className="form-control"
  value={goles}
  onChange={(event)=> 
  setGoles(event.target.value)} 
  required></input>
</div>

<div id="9" className="col-6">  
   <label htmlFor="tarjetas_amarillas" className="form-label mb-2 fw-bold">Tarjetas Amarillas</label>
  <input id="tarjetas_amarillas"
  type="number"
  placeholder="Tarjetas Amarillas"
  className="form-control"
  value={tarjetas_amarillas}
  onChange={(event)=> 
  setTarjetas_amarillas(event.target.value)} 
  required></input>
</div>

<div id="5" className="col-6">
  <label htmlFor="asistencias" 
  className="form-label mb-2 fw-bold">Asistencias</label>
  <input id="asistencias" placeholder=" Numero Asistencias" className="form-control" value={asistencias}onChange={(event)=> setAsistencias(event.target.value)} required></input>  
</div>

<div id="10" className="col-6">  
   <label htmlFor="tarjetas_Rojas" className="form-label mb-2 fw-bold">Tarjetas Rojas</label>
  <input id="tarjetas_Rojas"
  type="number"
  placeholder="Tarjetas Rojas"
  className="form-control"
  value={tarjetas_rojas}
  onChange={(event)=> 
  setTarjetas_rojas(event.target.value)} 
  required></input>
</div>

<div className="col-6">
<label htmlFor="partidos_jugados" className="form-label mb-2 fw-bold">Partidos jugados</label>
<input id="partidos_jugados"
type="number"
placeholder="Ingresar partidos jugados en el año"
className="form-control"
value={partidos_jugados}
onChange={(event)=>
  setPartidos_jugados(event.target.value)
}
required></input>
</div>
<div className="col-6">
  
<label htmlFor="minutos_jugados" className="form-label mb-2 fw-bold">Minutos jugados</label>
<input id="minutos_jugados"
type="number"
placeholder="Ingresar minutos jugados en el año"
className="form-control"
value={minutos_jugados}
onChange={(event)=>
  setMinutos_jugados(event.target.value)
}
required></input>
</div>

<div className="d-flex fondo justify-content-center align-items-center">
<button type="submit" className="btn btn-success" disabled={guardando}>
  {guardando ? "Actualizando..." : "Actualizar"}
</button>
</div>
</form>
  </div>
  </div>
);
}

export default EditarJugador;
