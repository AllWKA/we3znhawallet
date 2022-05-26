import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader || !authorizationHeader.length || !authorizationHeader.includes('Bearer')) {
    return res.sendStatus(401)
  }

  let token

  try {
    token = authorizationHeader.split('Bearer')[0].trim()
  } catch (e) {
    return res.sendStatus(401)
  }

  if (!token || !token.length) {
    return res.sendStatus(401)
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, { algorithm: 'RS256' }, (err, decode) => {
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
