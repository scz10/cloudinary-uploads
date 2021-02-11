const { fstat } = require('fs');
const users = require('../data/user.json')
const fs = require('fs');

module.exports = {
    getDataUsers: async () => {
        try {
            return {
                users
            }
        } catch (error) {
            throw error;
        }
    }
}
