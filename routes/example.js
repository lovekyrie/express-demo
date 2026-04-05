var express = require('express');
var router = express.Router();
var ExampleModel = require('../models/ExampleModel');

// GET /example - 查询所有
router.get('/', async function(req, res, next) {
  try {
    const examples = await ExampleModel.find();
    res.json(examples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /example - 新增
router.post('/', async function(req, res, next) {
  try {
    const example = new ExampleModel({
      a_string: req.body.a_string,
      a_date: req.body.a_date || new Date(),
    });
    await example.save();
    res.json(example);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
