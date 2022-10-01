const errorHandler = (err, req, res, next) => {
  const returnedStatus = res.returnedStatus ? res.returnedStatus : 500

  res.status(returnedStatus)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

module.exports = {
  errorHandler
}
