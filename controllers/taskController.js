
const edit = (req, res) => {
    res.render('users/update-task', {
        title: "Update"
    })
}
const create = (req, res) => {
    res.render('users/create-task', {
        title: "Create"
    })
}

module.exports = {
    editTaskPage: edit,
    createTaskPage: create
};