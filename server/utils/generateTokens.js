require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

function generateTokens(payload) {
  return {
    accessToken: jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: jwtConfig.access.expiresIn,
    }),
    refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: jwtConfig.refresh.expiresIn,
    }),
  };
}

module.exports = generateTokens;

// function generateToken(payload, expiresIn) {
//   return jwt.sign(payload, 'your-secret-key', { expiresIn }); // your-secret-key  ЗАМЕНИТЕ  на  ваш  настоящий  секретный  ключ
// }

// const payload = { user_id: 1, username: 'john_doe' };

// // Токен, действительный 15 минут
// const token15m = generateToken(payload, '15m');
// console.log('Токен (15 минут):', token15m);

// // Токен, действительный 1 час
// const token1h = generateToken(payload, '1h');
// console.log('Токен (1 час):', token1h);

// // Токен, действительный 2 дня
// const token2d = generateToken(payload, '2d');
// console.log('Токен (2 дня):', token2d);

// // Токен, действительный 900 секунд (15 минут)
// const token900s = generateToken(payload, 900);
// console.log('Токен (900 секунд):', token900s);
