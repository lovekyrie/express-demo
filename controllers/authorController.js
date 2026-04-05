var Author = require('../models/author');
var asyncHandler = require('express-async-handler');

// 显示所有作者列表
exports.author_list = asyncHandler(async function (req, res, next) {
  const authors = await Author.find().sort({ family_name: 1 });
  res.json(authors);
});

// 显示单个作者详情
exports.author_detail = asyncHandler(async function (req, res, next) {
  const author = await Author.findById(req.params.id);
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  res.json(author);
});

// 创建作者
exports.author_create = asyncHandler(async function (req, res, next) {
  const author = new Author(req.body);
  await author.save();
  res.json(author);
});

// 更新作者
exports.author_update = asyncHandler(async function (req, res, next) {
  const author = await Author.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  res.json(author);
});

// 删除作者
exports.author_delete = asyncHandler(async function (req, res, next) {
  await Author.findByIdAndDelete(req.params.id);
  res.json({ message: 'Author deleted' });
});
