// To automatically catch async errors in Express routes without writing try-catch every time.
module.exports = (fn) => (req, res, next) => { // This is exporting a function that accepts another function fn — typically an async route
  Promise.resolve(fn(req, res, next)).catch(next);
  /*
    1. fn(req, res, next)
    → This runs your original async route handler.

    2. Promise.resolve(...)
    → Wraps the result in a promise (even if fn didn't explicitly return one). Useful for both async and non-async functions.

    3. .catch(next)
    → If fn() throws an error or returns a rejected promise, it passes the error to next(), which is how Express knows an error occurred.
    That way, it triggers your global error handler (e.g., middleware like app.use((err, req, res, next) => { ... })).
    */
};
