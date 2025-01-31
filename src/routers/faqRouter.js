const express = require("express");
const { getFAQs, addFAQs } = require("../controllers/faqController");
const router = express.Router();

router.get("/", getFAQs);
router.post("/", addFAQs);

module.exports = router;
