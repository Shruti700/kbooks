const express= require('express');
const Router= express.Router();
const {getBook,  createBooks, handleEdit,handleFormEdit, handleDelete, handleDeleteAll}= require('../controllers/book');

Router.get('/:id', getBook);
Router.post('/newbook', createBooks);
Router.get('/edit/:id', handleFormEdit);
Router.post('/edit/:id', handleEdit);
Router.delete('/:id', handleDelete);
Router.delete('/', handleDeleteAll);

module.exports= Router;
