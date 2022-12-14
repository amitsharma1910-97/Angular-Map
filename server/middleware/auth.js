const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET= "ecommercewebapi"

const auth = async(req, res, next) => {
try {
  const token = req.header('Authorization').replace('Bearer ', '')
  const decoded = jwt.verify(token, JWT_SECRET)
  const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })
if(!user) {
throw new Error
}
  req.token = token
  req.user = user
  req.user.id = decoded._id
next()
} catch (error) {
res.status(401).send({error: "Authentication required"})
 }
}
module.exports = auth

