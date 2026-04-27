// Every request must include x-api-key header with correct key

const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // This chunk will check wether API key is provided
    if (!apiKey) {
        return res.status(401).json({
            success: true,
            error: 'Unauthorized',
            message: 'API Key is missing.',
        });
    }

    // check if API key matches the hardcoded key from .env
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({
            success: false,
            error: 'Forbidden',
            message: 'Invalid API Key',
        });
    }

    // If key is valid then continue to route handler
    next();
}

module.exports = apiKeyAuth;