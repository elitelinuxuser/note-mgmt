const express = require("express");
const cors = require("cors");
var winston = require("winston");

const app = express();

app.use(cors());

//Init Middleware
app.use(express.json({ extended: false }));

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "your-service-name" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

module.exports = { logger };

app.get("/", (req, res) => res.send("Server endpoint / called!"));

app.use("/api/add", require("./routes/api/addnote"));
app.use("/api/remove", require("./routes/api/removenote"));
app.use("/api/list", require("./routes/api/listnotes"));
app.use("/api/update", require("./routes/api/updatenote"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/search", require("./routes/api/searchnote"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
