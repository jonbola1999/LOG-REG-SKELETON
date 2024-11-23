const express = require("express");
require("dotenv").config();
const serverConfig = require("./config/serverConfig");
const apiRoutes = require("./routes/api.routes");

const app = express();
const PORT = 3000;

// конфигурация сервера
serverConfig(app);

// маршрутизация
app.use("/api", apiRoutes);

// запускаю прослушивание сервера на 3000 порту
app.listen(PORT, () => console.log(`Сервер запущен ${PORT} порту`));
