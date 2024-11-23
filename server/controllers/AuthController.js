const AuthService = require("../services/Auth.service");

class AuthController {
  static async register(req, res) {
    const { email, name, password, role } = req.body;
    try {
      const { user, accessToken, refreshToken } =
        await AuthService.registerUser(email, name, password, role);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 3600 * 6 * 60 * 24,
      });
      res.status(201).json({ user, message: "success", accessToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async authorization(req, res) {
    const { email, password } = req.body;
    try {
      const { user, accessToken, refreshToken } =
        await AuthService.authorizeUser(email, password);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 3600 * 6 * 60 * 24,
      });
      res.status(200).json({ user, accessToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async refresh(req, res) {
    try {
      const user = res.locals.user;
      const { accessToken, refreshToken } = await AuthService.refreshTokens(
        user
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 3600 * 6 * 60 * 24,
      });
      res.status(200).json({ user, accessToken });
    } catch (error) {
      res.status(401).json({ user: {}, accessToken: "" });
    }
  }

  static async logout(req, res) {
    res.clearCookie("refreshToken").json({ message: "clearCookie" });
  }
}

module.exports = AuthController;
