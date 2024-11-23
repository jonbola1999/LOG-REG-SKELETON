const router = require("express").Router();
const AuthController = require("../controllers/AuthController");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");

router.post("/reg", AuthController.register);
router.post("/log", AuthController.authorization);
router.get("/refresh", verifyRefreshToken, AuthController.refresh);
router.delete("/logout", AuthController.logout);

module.exports = router;
