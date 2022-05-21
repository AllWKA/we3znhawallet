import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const pin = req.body.pin

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
