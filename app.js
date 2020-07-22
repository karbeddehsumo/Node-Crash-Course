const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { render } = require('ejs');
const methodOverride = require('method-override');

const blogRoutes = require('./routes/blogRoutes');





const app = express();

const dbURI = 'mongodb://gfumbah:John316love@ds019688.mlab.com:19688/nodecrashcourse'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//Register view engine
app.set('view engine', 'ejs');


//middleware and static files
app.use(express.static('public')); //folder name to hold static files to make them accessible
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.redirect('/blogs');  
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
});

  //Blog Routes
  app.use('/blogs', blogRoutes);


  //404 page
  app.use((req,res)=>{
    res.status(404).render('404', {title: '404'});
  })