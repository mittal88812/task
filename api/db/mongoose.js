const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mittal123:Tushar@cluster0.4orw0.mongodb.net/TaskManager?retryWrites=true&w=majority').then(()=>{
    console.log("Connected Successfully.");
}).catch((err)=>{  
    console.log('Some error connecting with DB.', err);
});


// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
}