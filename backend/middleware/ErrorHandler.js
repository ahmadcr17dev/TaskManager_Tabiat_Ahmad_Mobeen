// This is a Global Error Handler - catches all errors passed via next (err)
// It must have 4 parameters for Express to treat it as error handler

const errorHandler = (err, req, res, next) => {
    console.error('Error: ', err.message);

    // Mongoose validation error. e.g: used for missing fields, enum mismatch
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            message: err.message,
        });
    }

    // Mongoose Bad Object ID
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            error: 'Invalid ID',
            message: 'The task ID you provided is not valid',
        });
    }

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            error: 'Duplicate Error',
            message: 'A task with this value already exists',
        });
    }

    // Default Server Error
    res.status(err.status || 500).json({
        success: false,
        error: 'Server Error',
        message: err.message || 'Something went wrong',
    });
}

module.exports = errorHandler;