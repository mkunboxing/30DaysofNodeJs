
function logMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;
  const headers = JSON.stringify(req.headers);
  const body = req.body;

  console.log("Timestamp = ", timestamp);
  console.log("http method = ", method);
  console.log("URl = ", url);
  console.log("Header = ", headers);
  console.log("Body = ", body);
  next();
}

module.exports = logMiddleware;