const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5500;

const cacheControl = (cacheType, maxAge, ...other) => {
  return (req, res, next) => {
    const cacheHeader = `${cacheType}, max-age=${maxAge} ${other}`;
    res.set("Cache-Control", cacheHeader.trim());
    next();
  };
};

app.get("/static", cacheControl("public", 86400), (req, res) => {
  res.sendFile("path_to_file");
});

app.get("/user/profile", cacheControl("private", 3600), async (req, res) => {
  res.json({
    name: "any_name",
    password: "secure_password",
    otherProfileData: {},
  });
});

app.get("api/sensitive_data", cacheControl("no-store"), async (req, res) => {
  res.json({ sensitive_data: "never cache this" });
});

app.get(
  "/content",
  cacheControl("public", 1800, "must-revalidate"),
  async (req, res) => {
    res.send({ content: "must be revalidate" });
  }
);

app.get("/", async (req, res) => {
  res.send("Hey I am Rahi.");
});

app.listen(port, () => {
  console.log(`server is running: ${port}`);
});
