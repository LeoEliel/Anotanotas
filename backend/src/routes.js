const express = require('express');
const NoteController = require('./controllers/NoteController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


// Rotas para operar as notes

routes.get('/home', NoteController.index);
routes.post('/new', NoteController.create);
routes.get('/edit/:id', NoteController.indexUpdate);
routes.put('/edit/:id', NoteController.update);
routes.delete('/del/:id', NoteController.delete);

//Rotas para operar os users

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

// Rota para Login

routes.post('/sessions', SessionController.create);


module.exports = routes;