const mongoose = require("mongoose");
const aboutUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productName1: {
    type: String,
    required: true
  },
  productTitle1: {
    type: String,
    required: true
  },
  productDescription1: {
    type: String,
    required: true
  },
  productImage1: {
    type: String,
    required: true
  },
  image1: {
    type: String,
    required: true
  },
  productName2: {
    type: String,
    required: true
  },
  productTitle2: {
    type: String,
    required: true
  },
  productDescription2: {
    type: String,
    required: true
  },
  productImage2: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
  productName3: {
    type: String,
    required: true
  },
  productTitle3: {
    type: String,
    required: true
  },
  productDescription3: {
    type: String,
    required: true
  },
  productImage3: {
    type: String,
    required: true
  },
  image3: {
    type: String,
    required: true
  },
  section2Title: {
    type: String,
    required: true
  },
  section2Description: {
    type: String,
    required: true
  },
  section3Name: {
    type: String,
    required: true
  },
  section3Title: {
    type: String,
    required: true
  },
  section3Description: {
    type: String,
    required: true
  },
  section3Image: {
    type: String,
    required: true
  },
  section4Title: {
    type: String,
    required: true
  },
  section4Description: {
    type: String,
    required: true
  },
  section4Image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);