const db = require('../models');

module.exports = {

    // find all applications
    async allApplications(req, res) {
        try {
            let app = await db.Application.findAll({})
            res.send(app)
        } catch (err) {
            res.status(500).send({
                error: "Error has occured when trying to pull all applications"
            })
        }
    },

    // Find all applications by UserId
    async allApplicationsById(req, res) {
        try {
            res.send(await db.Application.findAll({
                where: {
                    // find all applications related to the Applicaitons foreign key UserId...
                    UserId: req.params.UserId
                }
            }))
        } catch (err) {
            res.status(500).send({
                error: "Error has occured when trying to pull applications by UserId"
            })
        }
    },

    // Find all applications by UserId & status
    // Application per status [wishlist, interview, applied, offered, rejected]
    async showApplicationStatus(req, res) {
        try {
            res.send(await db.Application.findAll({
                where: {
                    UserId: req.params.UserId,
                    status: req.params.status
                }
            }))
        } catch (err) {
            res.status(500).send({
                error: "Error has occured when trying to pull applications by status"
            })
        }
    },

    // Create - job application database line item in a modal ensure that this is posting to the correct UserId
    async createApplication(req, res) {
        try {
            res.send(await db.Application.create(req.body))
        } catch (err) {
            res.status(500).send({
                error: "Error has occured while creating job application"
            })
        }
    },

    // Update Application Status - change the status of an application
    async updateApplication(req, res) {
        try {
            res.send(await db.Application.update(req.body,
                {
                    where: {
                        id: req.params.id
                    }
                }))
        } catch (err) {
            res.status(500).send({
                error: "Error has occured while updating job application"
            })
        }
    },

    // Delete Application
    async deleteApplication(req, res) {
        try {
            await db.Application.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                })
            console.log('DESTROYED')
        } catch (err) {
            res.send(err)
        }
    }
}