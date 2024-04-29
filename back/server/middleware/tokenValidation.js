const jwt = require('jsonwebtoken')
const { restart } = require('nodemon')

module.exports.validateToken = (req, res, next) => {
  let response = {}

  console.log("****bienvenue dans le middleware")

  try {
    if (!req.headers.authorization) {
      throw new Error('Token is missing from header')
    }

    const userToken = req.headers.authorization.split('Bearer')[1].trim()
    const decodedToken = jwt.verify(
      userToken,
      process.env.SECRET_KEY || 'default-secret-key' 
    )
    return next()
  } catch (error) {
    console.error('Error in tokenValidation.js', error)
    response.status = 401
    response.message = error.message
  }

  console.log('***response du middleware', response)

  return res.status(response.status).send(response)
}
