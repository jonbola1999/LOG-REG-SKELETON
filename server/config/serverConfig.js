const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const serverConfig = (app) => {
  // погран. служба / парсит тело из формы
  app.use(express.urlencoded({ extended: true }));

  // погран. служба регистрации / парсит JSON
  app.use(express.json());

  // "служба" фиксации логов
  app.use(morgan("dev"));

  //Парсинг куки
  app.use(cookieParser());

  // настройка статики, папка public ассоциирована с маршрутом запроса
  app.use(express.static("public"));

  // разрешить запросы (http://localhost:5173), устанавливает статус ответа для предварительных запросов в 200
  // и разрешает передачу учетных данных (куки, заголовки авторизации) в запросах.
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
};

module.exports = serverConfig;
