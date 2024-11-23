const jwtConfig = {
  access: {
    type: "accessToken",
    expiresIn: `${1000 * 60 * 5}`, // 5 минут 1000(мс) * 60(сек) * 5(мин)
  },
  refresh: {
    type: "refreshToken",
    expiresIn: `${1000 * 60 * 60 * 12}`,
  },
};

module.exports = jwtConfig;
