create database ReactJugadores

use ReactJugadores

/* CAMPOS Y TIPOS DE DATO DE LA TABLA PREVIAMENTE CREADA
nombre varchar
apellido varchar
equipo varchar
goles int
asistencias int
puesto varchar
edad int
pais varchar
codigo_pais char(2)
partidos_jugados int
tarjetas_amarillas int
tarjetas rojas int
minutos_jugados int
*/


-- Insert de prueba, repetir con otros 2 inserts mas
insert into jugadores (nombre, apellido, equipo, goles, asistencias, puesto, edad, pais, codigo_pais, partidos_jugados, tarjetas_amarillas, tarjetas_Rojas, minutos_jugados) 
values ('Eryc', 'Castillo', 'Alianza Lima', 20, 6, 'Extremo izquierdo', 31, 'Ecuador', 'EC', 31, 2, 1, 2541)


--  SELECTS PARA LAS IFERENTES VENTANAS EN EL FRONT----------------

-- GOLEADORES
select nombre , apellido, puesto, equipo, edad, codigo_pais , pais , goles, partidos_jugados, minutos_jugados, ROUND(goles / partidos_jugados, 2) as golesPorPartido, CONCAT ('1 gol cada ', ROUND(minutos_jugados / goles, 2) , ' minutos') as golesCadaTantosMinutos from jugadores
where goles > 0
order by goles desc

-- MEJORES JUGADORES 
select nombre, apellido, puesto, equipo, edad, pais, goles, asistencias, (goles + asistencias) as goles_y_asistencias from jugadores
order by goles_y_asistencias desc

-- ASISTENCIAS
select nombre, apellido, puesto, equipo, edad, pais , asistencias, partidos_jugados, minutos_jugados, ROUND(asistencias/partidos_jugados, 2) as asistenciasPorPartido, CONCAT('1 asistencia cada ', ROUND(minutos_jugados/asistencias, 2), ' minutos') as asistenciasCadaTantosMinutos from jugadores


-- AMONESTADOS
select nombre, apellido, puesto, equipo, tarjetas_amarillas, tarjetas_rojas, (tarjetas_amarillas + tarjetas_rojas ) as totalTarjetas from jugadores
order by totalTarjetas desc