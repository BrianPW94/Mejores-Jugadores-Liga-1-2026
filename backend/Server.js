const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();


app.use(express.json());
app.use(cors());

const baseDatos = mysql2.createConnection(
   {
    host: "localhost",
    user: "root",
    password: "1212",
    database: "ReactJugadores"
   } 
);

app.get("/" , (req, res) => {
    const sql = 'select * from jugadores';
    baseDatos.query(sql, (err, data) =>{
        if (err) {
            console.error("Error al consultar MYSQL: ", err.message );
            return res.status(500).json({error: "No se pudo consultar jugador"});
        } 
        return res.json(data);
    })
})

app.post("/AgregarJugador", (req, res) => {
    const{
        nombre, apellido, equipo, goles, asistencias, puesto, edad, pais, codigo_pais, tarjetas_amarillas, tarjetas_rojas,partidos_jugados, minutos_jugados
    } = req.body;

    const sql = "CALL sp_AgregarJugadores(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const valores = [nombre, apellido, equipo, goles, asistencias, puesto, edad, pais, codigo_pais, tarjetas_amarillas, tarjetas_rojas, partidos_jugados, minutos_jugados];

    baseDatos.query(sql, valores, (err)=> {
      if (err) {
          console.error("Error al agrgar jugador: ", err.message);
        return res.status(500).json({error: "No se pudo agregar jugador"});
      }
      return res.status(201).json({mensaje: "Jugador agregado"})
    });
});


//Editar
app.get("/Editar/:id", (req, res) =>{
    const sql = "select * from jugadores where id = ?";

    baseDatos.query(sql, [req.params.id],
        (err, data) => {
            if (err){
            console.error("Error consultando jugador: ", err.message);
            return res.status(500).json({
                error: "No se puede consultar jugador"
            });
        }
if (data.length === 0) {
    return res.status(404).json({
        error: "No se encontro el jugador"
    });    
}

return res.json(data[0]);
        });
});


app.put("/Editar/:id", (req, res) => {
    const sql = "update jugadores set nombre = ?, apellido = ?, equipo = ?, goles = ?, asistencias = ?, puesto = ?, edad = ?, pais = ?, codigo_pais = ?, tarjetas_amarillas = ?, tarjetas_rojas = ?, partidos_jugados = ?, minutos_jugados = ? where id = ?";

    const values = [
        req.body.nombre,
        req.body.apellido,
        req.body.equipo,
        req.body.goles,
        req.body.asistencias,
        req.body.puesto,
        req.body.edad,
        req.body.pais,
        req.body.codigo_pais,
        req.body.tarjetas_amarillas,
        req.body.tarjetas_rojas,
        req.body.partidos_jugados,
        req.body.minutos_jugados
    ];
    const id =  req.params.id;

    baseDatos.query(sql, [...values, id],
        (err, data) =>{
            if (err) {
                console.error("Error actualizando dato en la base de datos: ", err.message);
                return res.status(500).json({
                    error: "No se pudo ingresar jugador"
                });                
            }

            return res.json(data);
        });
});

//eliminar
app.delete('/jugador/:id',(req, res) =>{
    const sql = "delete from jugadores where id = ?";
    const id = req.params.id;

    baseDatos.query(sql, [id], (err, data) =>{
        if (err) {
            console.error("Error eliminando jugador:", err.message);
            
            return res.status(500).json({ error: "No se pudo eliminar jugador" });           
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró el futbolista" });         
        }
        return res.json(data);
    })
})    

//GOLEADORES
app.get("/Goleadores", (req, res) => {
    const sql = "select nombre , apellido, puesto, equipo, edad,  codigo_pais, pais , goles, partidos_jugados, minutos_jugados, ROUND(goles / partidos_jugados, 2) as golesPorPartido, CONCAT ('1 gol cada ', ROUND(minutos_jugados / goles, 2) , ' minutos') as golesCadaTantosMinutos from jugadores where goles > 0 order by goles desc";

    baseDatos.query(sql, (err, data) => {
        if (err) {
            console.error("Error al consultar goleadores en la base de datos: ", err.message);
            return res.status(500).json({error: "No se pudo consultar goleador"});            
        }
        return res.json(data);
    })
})

app.get("/mejorProduccion", (req, res) => {
    const sql= "select nombre, apellido, puesto, equipo, edad, codigo_pais, pais,goles, asistencias, (goles + asistencias) as goles_y_asistencias, partidos_jugados from jugadores order by goles_y_asistencias desc";
    
    baseDatos.query(sql,  (err, data) => {
        if (err) {
            console.error("Error al consultar goleadores en la base de datos: ", err.message);
            return res.status(500).json({error: "No se pudo consultar goleador"});
        }
        return res.json(data);
})
})

app.get("/Asistidores", (req, res)=> {
    const sql = "select nombre, apellido, puesto, equipo, edad,codigo_pais, pais , asistencias, partidos_jugados, minutos_jugados, ROUND(asistencias/partidos_jugados, 2) as asistenciasPorPartido, CONCAT('1 cada ', ROUND(minutos_jugados/asistencias, 2), ' minutos') as asistenciasCadaTantosMinutos from jugadores order by asistencias desc";

    baseDatos.query(sql, (err, data)  =>{
        if (err) {
            console.error("Error al consultar asistidores en la base de datos: ", err.message);

            return res.status(500).json({error: "No se puede consultar asistidor"});

        }
        return res.json(data);
    })
})

app.get("/Amonestados", (req, res) => {
    const sql = "select nombre, apellido, puesto, equipo, tarjetas_amarillas, tarjetas_rojas, (tarjetas_amarillas + tarjetas_rojas ) as totalTarjetas from jugadores order by totalTarjetas desc";

    baseDatos.query(sql, (err, data) =>{
        if (err) {
            console.error("Error al consultar amonestados en la base de datos ", err.message);
            
            return res.status(500).json({error: "No se puede consultar asistidor"});
        }
        return res.json(data);
    })
})


app.listen(8081, () =>{
    console.log('listening');
})
