const mongoose = require("mongoose");

//on utilise les schemas qui nous sont fournis par mongoose
const Schema = mongoose.Schema;

// on créé un nouveau schema nommé "UserSchema" (schemas === models en sequelize)
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    version: {
        type: Number,
        required : true,
        default: 0,
    }
});

//on export notre schema en tant que model avec le nom "users" et qui correspond au schema créé précèdemment, on l'exporte en lui donnant le nom "User"
module.exports = User = mongoose.model("users", UserSchema);
