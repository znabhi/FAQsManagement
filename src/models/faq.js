"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const FAQ = sequelize.define("FAQ", {
    question: { type: DataTypes.STRING, allowNull: false },
    answer: { type: DataTypes.TEXT("long"), allowNull: false },
    question_hi: { type: DataTypes.STRING },
    answer_hi: { type: DataTypes.TEXT("long") },
    question_bn: { type: DataTypes.STRING },
    answer_bn: { type: DataTypes.TEXT("long") },
  });

  FAQ.prototype.getTranslated = function (lang) {
    return {
      question:
        lang === "hi"
          ? this.question_hi || this.question
          : lang === "bn"
          ? this.question_bn || this.question
          : this.question,
      answer:
        lang === "hi"
          ? this.answer_hi || this.answer
          : lang === "bn"
          ? this.answer_bn || this.answer
          : this.answer,
    };
  };

  return FAQ;
};
