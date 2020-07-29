const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/derive', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(() => console.log('Db connection established.'))
    .catch(err => console.log('There was an error', err))