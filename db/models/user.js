import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    isAdmin: {type: Boolean, required: true, default: false}
})

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);