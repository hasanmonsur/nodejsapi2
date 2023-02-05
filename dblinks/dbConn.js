
const mongoString = process.env.DATABASE_URL;
const mongoose = require('mongoose');

console.log('Connect Mongo db:', mongoString);

mongoose.set("strictQuery", false);
mongoose.connect(mongoString,{ useNewUrlParser: true, useUnifiedTopology: true });


       /* mongoose.connect(mongoString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });*/