const jwt = require("jsonwebtoken");

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);
    console.error("Invalid refresh token");
    res.status(401).clearCookie("refreshToken");
  }
}

module.exports = verifyRefreshToken;
