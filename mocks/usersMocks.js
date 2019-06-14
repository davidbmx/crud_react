const bcrypt = require('bcrypt');
const User = require('../models/UsersModel');
const debug = require('debug')('crud-react:mocksUsers');

const createUsers = () => {
    User.find({}).exec().then(users => {
        debug(`Count users exists ${users.length}`);
        if (!users.length) {
            bcrypt.hash('admin', 10, (err, hash) => {
                if (!err) {
                    const user = new User({
                        username: 'admin',
                        password: hash,
                        first_name: 'admin',
                        last_name: 'admin',
                        roles: ['create', 'read', 'update', 'delete']
                    });
                    
                    user.save().then();
                }
            });
        }
    });
}

module.exports = {
    createUsers
};
