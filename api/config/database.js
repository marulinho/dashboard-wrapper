module.exports = {
  secret: "wrapper-mlc",
  database: process.env.MONGODB_URL || "mongodb://localhost:27017/local",
};
