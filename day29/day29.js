const express = require("express");
const app = express();

const handleServerError = (err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};

app.get("/example", (req, res, next) => {
  try {
    // Some operation that might throw an error
    throw new Error("This is a sample error");
    res.status(200).json({ message: "Success" });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// centralized error handling middleware
app.use(handleServerError);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
