import Api from '../config/Api'

export default {
    // get all applications by user ID & status
    status(UserId, status) {
        return Api().get(`/applications/user/${UserId}/status/${status}`)
    },
    // All Job Applications
    all() {
        return Api().get('applications')
    },
    // Add Job Application
    addApplication(application) {
        return Api().post('application', application)
    },
    // Update Job Application
    updateApplication(application) {
        return Api().put(`application/${application.id}`, application)
    },
    // Delete Job Application
    deleteApplication(application) {
        return Api().delete(`application/delete/${application.id}`)
    }

}
