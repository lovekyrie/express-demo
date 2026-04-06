var Genre = require('../models/genre');
var asyncHandler = require('express-async-handler');

// 显示所有流派列表
exports.genre_list = asyncHandler(async function (req, res, next) {
  const genres = await Genre.find().sort({ name: 1 });
  res.render('genre_list', { title: 'Genre List', genre_list: genres });
});

// 显示单个流派详情
exports.genre_detail = asyncHandler(async function (req, res, next) {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).json({ error: 'Genre not found' });
  }
  res.json(genre);
});

// 创建流派
exports.genre_create = asyncHandler(async function (req, res, next) {
  const genre = new Genre(req.body);
  await genre.save();
  res.json(genre);
});

// 更新流派
exports.genre_update = asyncHandler(async function (req, res, next) {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!genre) {
    return res.status(404).json({ error: 'Genre not found' });
  }
  res.json(genre);
});

// 删除流派
exports.genre_delete = asyncHandler(async function (req, res, next) {
  await Genre.findByIdAndDelete(req.params.id);
  res.json({ message: 'Genre deleted' });
});
