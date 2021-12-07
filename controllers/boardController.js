const store = (req, res) => {
    const { board_name } = req.body;
        
    return res.status(200).json({
        message: 'Board created successfully',
    });
}


module.exports = {
    boardStore : store,
}