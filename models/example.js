const ExampleModel = require('./ExampleModel');

// 增加数据
async function createExample() {
  const example = new ExampleModel({
    a_string: 'Hello World',
    a_date: new Date(),
  });
  await example.save();
  console.log('Created:', example);
}

// 查询所有数据
async function findExamples() {
  const examples = await ExampleModel.find();
  console.log('Found:', examples);
}

// 按条件查询
async function findByString(str) {
  const examples = await ExampleModel.find({ a_string: str });
  console.log('Found:', examples);
}

module.exports = { createExample, findExamples, findByString };
