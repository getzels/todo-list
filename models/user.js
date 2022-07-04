const findOrCreate = require("mongoose-findorcreate");
const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        id: String,
        firstName: String,
        lastName: String,
        email: String
        },
    { timestamps: true }
);
UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('user', UserSchema);