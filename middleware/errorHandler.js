const errorHandler = (err, req, res, next) => {

    console.error(err.stack);

    res.status(err.status || 500).render('error', {
        title: 'Something went wrong',
        message: process.env.NODE_ENV === 'production'
            ? 'Please try again later.'
            : err.message
    });
};

module.exports = errorHandler;
