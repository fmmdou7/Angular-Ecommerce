const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://fatma:fatma@cluster0-xdcsk.mongodb.net/test?retryWrites=true&w=majority',

{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=>{
    console.info('connected successfully to MongoDB');
})
.catch(err => {
    console.error(`error while connection to mongo`, err);
});
