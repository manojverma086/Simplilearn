const mongoose = require("mongoose");
// DB Config
const DB_URI = require("../config/local").mongoURI;

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const Mockgoose = require("mockgoose").Mockgoose;
      const mockgoose = new Mockgoose(mongoose);
      mockgoose
        .prepareStorage()
        .then(() => {
          mongoose
            .connect(DB_URI, {
              useNewUrlParser: true,
            })
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            });
        })
        .catch((err) => reject(err));
    } else {
      mongoose
        .connect(DB_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
