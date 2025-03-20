const express = require('express');
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require('cors');
app.use(cors({
    origin: [
      'https://powercem.vercel.app',
      'http://localhost:3000'
    ],
    credentials: true
  }));
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log("Connected to MongoDB")
})
 

app.use('/uploads', express.static('uploads'));

const sliderRoutes = require('./routes/slider.route');
app.use('/api/sliders', sliderRoutes);

const certificationRoutes = require("./routes/certification.route")
app.use("/api/certifications", certificationRoutes)

const partnerRoutes = require("./routes/partner.route")
app.use("/api/partners", partnerRoutes)

const projectRoutes = require("./routes/project.route");
app.use("/api/projects", projectRoutes);

const clientRoute =require("./routes/clients.route")
app.use("/api/clients", clientRoute)

const egyClientRoute = require("./routes/egyclient.route")
app.use("/api/clients", egyClientRoute)

const productRoutes = require('./routes/product.route');
app.use('/api/products', productRoutes);

const contactRoutes = require('./routes/contact.route');
app.use('/api/contacts', contactRoutes);
const adminRoutes = require("./routes/admin.route")
app.use("/api/admin", adminRoutes)
const aboutUsRoutes = require('./routes/aboutus.route');
app.use('/api/aboutus', aboutUsRoutes);

app.get('/', (req, res) => {
    res.send('Hello in powerCem');  
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});