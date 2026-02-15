const express = require('express');
const router = express.Router();

// GET /classes - Show classes page
router.get('/', (req, res) => {
  res.render("classes.ejs", { 
    title: "Home", 
    email: "Test", 
    classes: [
      {
        title: "Deterministic OR Models",
        code: "CO370",
        colour: "orange",
        grade: 90
      },
      {
        title: "Non-Linear Optimization",
        code: "CO367",
        colour: "red",
        grade: 90
      },
      {
        title: "App Development",
        code: "CS346",
        colour: "green",
        grade: 90
      },
      {
        title: "Strategic Management I",
        code: "BU481",
        colour: "teal",
        grade: 90
      },
      {
        title: "Options, Futures, & Swaps",
        code: "BU423",
        colour: "blue",
        grade: 90
      }
    ] 
  });
});

module.exports = router;

