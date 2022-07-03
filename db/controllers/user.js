import User from '../models/user.js';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { ResourceAlreadyExistsError } from '../../Errors/errors.js';

export const getUser = async (username) => {
    const user = await User.findOne({ username });

    return user;
}

export const createUser = async (username, password, isAdmin = false) => {
    const exists = await getUser(username);

    if (exists) throw new ResourceAlreadyExistsError(`User ${username} already exists`);
    const user = new User({
        username,
        password
    })

    const salt = genSaltSync(10);
    user.password = hashSync(password, salt);

    await user.save();

    return user;
}