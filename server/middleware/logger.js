function logRoutes(req, res, next) {
  console.log(req.method, req.originalUrl);
  next();
}

module.exports = logRoutes;

// This middleware function logs the HTTP method and URL of incoming requests.
// It uses the `next()` function to pass control to the next middleware or route handler.
// The `req` object contains information about the HTTP request, including the method (e.g., GET, POST) and the original URL.
// The `res` object represents the HTTP response that an Express app sends when it gets an HTTP request.
// The `next` function is a callback that, when called, executes the next middleware function in the stack.
// This is useful for debugging and monitoring the API's usage.
// The middleware is then used in the main application file (app.js) to log all incoming requests.
