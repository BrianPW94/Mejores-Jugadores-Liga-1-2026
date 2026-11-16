

DELIMITER $$
create procedure sp_AgregarJugadores(
in j_nombre varchar(100),
in j_apellido varchar(200),
in j_equipo varchar (100),
in j_goles int,
in j_asistencias int,
in j_puesto varchar(100),
in j_edad int,
in j_pais varchar(250),
in j_codigo_pais char(2),
in j_tarjetas_amarillas int,
in j_tarjetas_rojas int,
in j_partidos_jugados int,
in j_minutos_jugados int
)
begin
	insert into jugadores (nombre, apellido, equipo, goles, asistencias, puesto, edad, pais, codigo_pais, tarjetas_amarillas, tarjetas_rojas, partidos_jugados, minutos_jugados) 
	values(j_nombre, j_apellido, j_equipo, j_goles, j_asistencias, j_puesto, j_edad, j_pais, j_codigo_pais, j_tarjetas_amarillas, j_tarjetas_rojas, j_partidos_jugados, j_minutos_jugados);
	end $$	
	DELIMITER ;

-- prueba para saber si funciona el sp
call sp_AgregarJugadores('Carlos', 'Garcés', 'Cienciano', 18, 4, 'Delantero centro', 36, 'Ecuador', 'EC', 7, 0, 31, 2392);

