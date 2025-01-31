const { FAQ } = require("../models/index");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const getFAQs = async (req, res) => {
  const lang = req.query.lang || "en";
  const cacheKey = `faqs_${lang}`;

  try {
    // const cachedData = await redisClient.get(cacheKey);
    // if (cachedData) {
    //   return res.json(JSON.parse(cachedData));
    // }
    const faqs = await FAQ.findAll();
    console.log(faqs);

    const translatedFAQs = faqs.map((faq) => faq.getTranslated(lang));

    await redis.setex(cacheKey, 3600, JSON.stringify(translatedFAQs));

    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch FAQs",
      success: false,
      error,
    });
  }
};

// const addFAQs = async (req, res) => {
//   try {
//     const { question, answer } = req.body;

//     const translate = async (text, targetLang) => {
//       const response = await axios.get(
//         `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURI(
//           text
//         )}`
//       );
//       return response.data[0][0][0];
//     };
//     const answer_hi = await translate(answer, "hi");
//     const answer_bn = await translate(answer, "bn");

//     const question_hi = await translate(question, "hi");
//     const question_bn = await translate(question, "bn");

//     const faq = await FAQ.create({ question, answer, language: "en" });
//     await FAQ.create({
//       question: question_hi,
//       answer: answer_hi,
//       language: "hi",
//     });
//     await FAQ.create({
//       question: question_bn,
//       answer: answer_bn,
//       language: "bn",
//     });

//     res.status(201).json({
//       data: faq,
//       message: "FAQ added successfully",
//       error: {},
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

const addFAQs = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Validate input
    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required!",
      });
    }

    // Function to translate text
    const translate = async (text, targetLang) => {
      try {
        const response = await axios.get(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURI(
            text
          )}`
        );
        return response.data[0][0][0];
      } catch (error) {
        console.error(`Translation Error for ${targetLang}:`, error.message);
        return null; // Fallback to null if translation fails
      }
    };

    // Run translations in parallel
    const [question_hi, question_bn, answer_hi, answer_bn] = await Promise.all([
      translate(question, "hi"),
      translate(question, "bn"),
      translate(answer, "hi"),
      translate(answer, "bn"),
    ]);

    // Create a single row with translations
    const faq = await FAQ.create({
      question,
      answer,
      question_hi,
      answer_hi,
      question_bn,
      answer_bn,
      language: "en",
    });

    // Store FAQs in Redis cache for fast retrieval
    const cacheKey = `faqs_en`;
    await redis.del(cacheKey); // Clear cache after update to keep data fresh

    res.status(201).json({
      success: true,
      message: "FAQ added successfully",
      data: faq,
    });
  } catch (error) {
    console.error("Error adding FAQ:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getFAQs,
  addFAQs,
};
