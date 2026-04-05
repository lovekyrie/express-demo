const Book = require('../models/book');
const BookInstance = require('../models/bookinstance');
const Author = require('../models/author');
const Genre = require('../models/genre');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  // 并行获取书的详细信息、书实例、作者和体裁的数量
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });
});

// 显示所有藏书列表
exports.book_list = asyncHandler(async function (req, res, next) {
  const books = await Book.find().populate('author').sort({ title: 1 });
  res.json(books);
});

// 显示单本藏书详情
exports.book_detail = asyncHandler(async function (req, res, next) {
  const book = await Book.findById(req.params.id)
    .populate('author')
    .populate('genre');
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// 创建藏书
exports.book_create = asyncHandler(async function (req, res, next) {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// 更新藏书
exports.book_update = asyncHandler(async function (req, res, next) {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// 删除藏书
exports.book_delete = asyncHandler(async function (req, res, next) {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});
