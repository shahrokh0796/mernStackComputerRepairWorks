// const cspMiddleware = (req, res, next) => {
//     const scriptSrc = [ "'self'",
//     "https://*.google.com",
//     "https://*.gstatic.com",
//     "https://*.googleapis.com"];

//     const connectSrc = [
//         "'self'",
//         "http://localhost:3500",
//         "https://*.google.com",
//         "https://*.gstatic.com",
//         "https://*.googleapis.com"
//     ];

//     const csp = `script-src ${scriptSrc.join(' ')}; connect-src ${connectSrc.join(' ')};`;
//     res.setHeader('Content-Security-Policy', csp);
//     next();
// }

// module.exports = cspMiddleware;

const cspMiddleware = (req, res, next) => {
    const scriptSrc = [
        "'self'",
        "https://*.google.com",
        "https://*.gstatic.com",
        "https://*.googleapis.com"
    ];

    const connectSrc = [
        "'self'",
        "http://localhost:3500",
        "https://*.google.com",
        "https://*.gstatic.com",
        "https://*.googleapis.com"
    ];

    const csp = `script-src ${scriptSrc.join(' ')}; connect-src ${connectSrc.join(' ')};`;
    res.setHeader('Content-Security-Policy', csp);
    next();
}

module.exports = cspMiddleware;
