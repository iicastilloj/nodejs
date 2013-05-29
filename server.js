var express = require('express');
var app = express();//crea el servidor, y permite entrar a archivos estatico 
var server = app.listen(8081);//definimos el puerto de conexion del server
var io = require('socket.io').listen(server);//llama a var server para que abra el puerto 

app.configure(function(){
	app.use(express.static(__dirname+'/public/'));//este es un recurso accesible 
});

io.sockets.on('connection',function(socket){
	console.log('Cliente conectado');

	socket.on('btn',function(){
		console.log('presiono el boton');
		socket.emit('btn_return', {text: 'Gracias por presionar el botón'});//Evento en espera del cliente
		socket.broadcast.emit('btn_return', {text: 'Gracias por presionar eboton'});
	});

	socket.on('disconnect', function(){
		console.log('Conexion cerrada');
	});//Eventos del lado del cliente como refrewcar o cerrar ventana

	socket.on('user_write',function(){
		socket.broadcast.emit('user_writing');
	});

	socket.on('user_leave_write', function(){
		socket.broadcast.emit('user_leave_write');
	});
	socket.on('user_move',function(){
		socket.broadcast.emit('user_move', {text: 'El usuario esta moviendo el mouse'});
	});
	socket.on('user_move',function(){
		socket.broadcast.emit('user_moving_mouse');
	});

});