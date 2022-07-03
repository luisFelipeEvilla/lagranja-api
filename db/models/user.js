import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    admin: Boolean 
})

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);