const db = require("../models");
const jwt = require('jsonwebtoken')
const config = require('../config/config');

jwtSignUser = (user) => {

    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: "1d"
    })
}

module.exports = {

    async allUsers(req, res) {
        try {
            res.send(await db.User.findAll({}))
        }
        catch (err) {
            res.status(400).send({
                error: "Failed to get all User's information."
            })
        }
    },

    async getUser(req, res) {
        try {
            res.send(await db.User.findOne({
                where: {
                    id: req.params.id
                }
            }))
        }
        catch (err) {
            res.status(400).send({
                error: "Failed to get User's information."
            })
        }
    },

    // User Registration
    async register(req, res) {
        try {
            const user = await db.User.create(req.body)
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(400).send({
                error: err
            })
        }
    },

    // Log In: handled by passport
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await db.User.findOne({
                where: {
                    email: email
                }
            })

            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }

            const isPasswordValid = await user.validPassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }

            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured trying to log in (at User Controller)'
            })
        }
    },

    async logout(req, res) {
        try {
            req.logout()
            res.redirect('/');
        }
        catch (err) {
            req.send(err)
        }

    },
    // Delete User/Cascade
    async deleteUser(req, res) {
        try {
            await db.User.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send("User Destroyed")
            // run log out functionality to wipe out vuex store/signout
        }
        catch (err) {
            res.send(err)
        }
    },
    // Update User Information
    async updateUserInfo(req, res) {
        try {
            res.send(await db.User.update(req.body,
                {
                    where: {
                        id: req.params.id
                    }
                })
            )
        }
        catch (err) { res.send(err) }
    },
    // ******************** ICEBOX: Update Password TBD ********************
    async updatePassword(req, res) {
        try {
            res.send(await db.User.update(
                {
                    where: {
                        id: req.params.id
                    }
                })
            )
        }
        catch (err) {
            res.send(err)
        }
    }
};
