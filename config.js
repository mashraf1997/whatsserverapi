// Configuration is read from environment variables so that secrets never live
// in the repository. Copy .env.example to .env and fill in your values, or set
// these variables through your process manager (pm2, systemd, Docker, ...).
try {
    // dotenv is optional: if it isn't installed, environment variables set by
    // the host are still used.
    require("dotenv").config();
} catch (e) {
    /* dotenv not installed — rely on the ambient environment */
}

var bool = function (value, fallback) {
    if (value === undefined || value === null || value === "") {
        return fallback;
    }
    return /^(1|true|yes|on)$/i.test(String(value));
};

var int = function (value, fallback) {
    var n = parseInt(value, 10);
    return isNaN(n) ? fallback : n;
};

var config = {
    debug: bool(process.env.DEBUG, false),
    port: int(process.env.PORT, 8000),
    database: {
        connectionLimit: int(process.env.DB_CONNECTION_LIMIT, 100),
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "",
        charset: process.env.DB_CHARSET || "utf8mb4",
        debug: bool(process.env.DB_DEBUG, false),
        waitForConnections: true,
        // Kept off by default: enabling stacked queries turns any SQL-injection
        // bug into a full database compromise. Only enable it if you genuinely
        // need multiple statements per query.
        multipleStatements: bool(process.env.DB_MULTIPLE_STATEMENTS, false)
    },
    cors: {
        origin: process.env.CORS_ORIGIN || "*",
        optionsSuccessStatus: 200
    }
};

module.exports = config;
