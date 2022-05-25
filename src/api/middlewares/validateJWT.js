import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader || !authorizationHeader.length || !authorizationHeader.includes('Bearer')) {
    return res.sendStatus(401)
  }

  const pin = authorizationHeader.split(' ')[1]

  if (!pin || !pin.length) {
    return res.sendStatus(401)
  }

  try {
    jwt.verify(pin, process.env.JWT_SECRET, { algorithm: 'RS256' }, (err, decode) => {
      if (err) {
        return res.sendStatus(401)
      }

      const expTime = decode.exp

      if (expTime < Date.now()) {
        return res.sendStatus(401)
      }

      next()
    })
  } catch (e) {
    res.sendStatus(401)
  }
}
