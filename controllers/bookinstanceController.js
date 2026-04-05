var BookInstance = require('../models/bookinstance');
var asyncHandler = require('express-async-handler');

// 显示所有藏书副本列表
exports.bookinstance_list = asyncHandler(async function (req, res, next) {
  const bookinstances = await BookInstance.find()
    .populate('book')
    .sort({ due_back: 1 });
  res.json(bookinstances);
});

// 显示单个藏书副本详情
exports.bookinstance_detail = asyncHandler(async function (req, res, next) {
  const bookinstance = await BookInstance.findById(req.params.id).populate('book');
  if (!bookinstance) {
    return res.status(404).json({ error: 'BookInstance not found' });
  }
  res.json(bookinstance);
});

// 创建藏书副本
exports.bookinstance_create = asyncHandler(async function (req, res, next) {
  const bookinstance = new BookInstance(req.body);
  await bookinstance.save();
  res.json(bookinstance);
});

// 更新藏书副本
exports.bookinstance_update = asyncHandler(async function (req, res, next) {
  const bookinstance = await BookInstance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!bookinstance) {
    return res.status(404).json({ error: 'BookInstance not found' });
  }
  res.json(bookinstance);
});

// 删除藏书副本
exports.bookinstance_delete = asyncHandler(async function (req, res, next) {
  await BookInstance.findByIdAndDelete(req.params.id);
  res.json({ message: 'BookInstance deleted' });
});
