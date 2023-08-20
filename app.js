//#region Requires and Consts

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const PORT = process.env.PORT || 7010;

//#endregion

const password = encodeURIComponent("test1234");
const dbURI = `mongodb+srv://admin:${password}@learningcluster.l98mciq.mongodb.net/BlogsWebsite`;

mongoose.connect(dbURI)
  .then((result) =>
    app.listen(PORT, () => {
      console.log("http://localhost:" + PORT);
    })
  )
  .catch((err) => console.log(err.message)); //async

// register view engine
app.set("view engine", "ejs");

//#region Middlewares & static files
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//#endregion

//#region mongoose & mongo tests
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
//#endregion

// blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});