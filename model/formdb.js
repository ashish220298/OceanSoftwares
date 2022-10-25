const mongoose = require('mongoose');

let formSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    variants:{
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now()
    }

});

const items = mongoose.model("items", formSchema);

module.exports = items;