// Make edit of the course via popup

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cartRoutes = require('./routes/cart')


const app = express();
// Handlebars set up

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'

})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
    //end of set up

app.use(express.static(path.join(__dirname, 'public'))) // VERY IMPORTANT!
app.use(express.urlencoded({ extende: true }))

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server has started at port ${PORT}`)
});