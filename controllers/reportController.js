const {User, Task, userBoard, List} = require('../models')

const report = async(req, res) => {
    const reports = await Task.findAll({
        include: [userBoard, List],
        where:{
            user_id: req.session.user_id 
        }
    });

    for (reportDate of reports){
        let today = new Date()
        const new_due_date = new Date(reportDate.due_date);
        const duration = Math.floor(Math.abs(new_due_date - today) / (1000 * 60 * 60 * 24));
        reportDate.duration = duration
    }

    res.render('users/report-page', {
        title: "Report", 
        reports
    })
}
const reportUsers = async(req, res) => {
    const reportsUsers = await Task.findAll({
        include: [userBoard, User]
    });

    for (reportDate of reportsUsers){
        let today = new Date()
        const new_due_date = new Date(reportDate.due_date);
        const duration = Math.floor(Math.abs(new_due_date - today) / (1000 * 60 * 60 * 24));
        reportDate.duration = duration
    }


    res.render('admin/report', {
        title: "Report", 
        reportsUsers
    })
}



module.exports = {report, reportUsers};