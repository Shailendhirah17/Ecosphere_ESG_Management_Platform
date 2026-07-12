const errorResponse = (res, statusCode, message, error = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(error && process.env.NODE_ENV === 'development' && { error: error.message })
  });
};

const successResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data })
  });
};

const error = (res, message, statusCode) => {
  res.status(statusCode || 500).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: message })
  });
};

const success = (res, data, message, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data })
  });
};

module.exports = {
  errorResponse,
  successResponse,
  error,
  success
};
