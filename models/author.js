const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true },
  family_name: { type: String, required: true },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// 虚拟属性：作者全名
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

// 虚拟属性：作者寿命
AuthorSchema.virtual("lifespan").get(function () {
  if (!this.date_of_birth || !this.date_of_death) return "";
  const birth = new Date(this.date_of_birth);
  const death = new Date(this.date_of_death);
  return (death.getFullYear() - birth.getFullYear()).toString();
});

// 虚拟属性：格式化出生/死亡日期（2023 年 4 月 10 日）
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  if (!this.date_of_birth) return "";
  return moment(this.date_of_birth).format("YYYY 年 M 月 D 日");
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  if (!this.date_of_death) return "";
  return moment(this.date_of_death).format("YYYY 年 M 月 D 日");
});

// 虚拟属性：作者 URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

module.exports = mongoose.model("Author", AuthorSchema);
