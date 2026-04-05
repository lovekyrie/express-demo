var express = require('express');
var router = express.Router();

var authorController = require('../controllers/authorController');
var bookController = require('../controllers/bookController');
var genreController = require('../controllers/genreController');
var bookinstanceController = require('../controllers/bookinstanceController');

// 作者路由
router.get('/authors', authorController.author_list);
router.get('/authors/:id', authorController.author_detail);
router.post('/authors', authorController.author_create);
router.put('/authors/:id', authorController.author_update);
router.delete('/authors/:id', authorController.author_delete);

// 藏书路由
// 增加一个默认的index路由
router.get('/', bookController.index);
router.get('/books', bookController.book_list);
router.get('/books/:id', bookController.book_detail);
router.post('/books', bookController.book_create);
router.put('/books/:id', bookController.book_update);
router.delete('/books/:id', bookController.book_delete);

// 流派路由
router.get('/genres', genreController.genre_list);
router.get('/genres/:id', genreController.genre_detail);
router.post('/genres', genreController.genre_create);
router.put('/genres/:id', genreController.genre_update);
router.delete('/genres/:id', genreController.genre_delete);

// 藏书副本路由
router.get('/bookinstances', bookinstanceController.bookinstance_list);
router.get('/bookinstances/:id', bookinstanceController.bookinstance_detail);
router.post('/bookinstances', bookinstanceController.bookinstance_create);
router.put('/bookinstances/:id', bookinstanceController.bookinstance_update);
router.delete('/bookinstances/:id', bookinstanceController.bookinstance_delete);

module.exports = router;
