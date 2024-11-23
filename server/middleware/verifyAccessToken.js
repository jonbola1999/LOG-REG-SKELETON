const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

    // res.locals.user = user;
    // next();
    res.locals.user = user;
    const { role } = res.locals.user;
    (role === "Director" || role === "Manager") && next();
  } catch (error) {
    console.error(error);

    console.error("Invalid access token");
    res.status(403).send("Invalid access token");
  }
}

module.exports = verifyAccessToken;
