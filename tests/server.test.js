const app = require("../index");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
  mongoose.connect(
    `${process.env.MONGO_URI}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const { uploadFile, getFileStream } = require("../s3");

// it will check the proper and undefined data at the same time
test("POST /api/files", async () => {
  const file = {
    path: "add api key in reteam.png",
  };
  await supertest(app)
    .post("/api/files/")
    .send(file)
    .expect(200)
    .then(async (res) => {
      // Check the response
      expect("Created");
    });
});
// It will check only the valid id 
test("GET /api/files/eb3b0aad9fb469d00e0a6066feb742cf", async () => {
  await supertest(app)
    .get("/api/files/eb3b0aad9fb469d00e0a6066feb742cf")
    .expect(200)
    .then(async (req, res) => {
      const key = "eb3b0aad9fb469d00e0a6066feb742cf";
      getFileStream(key);
      expect("Got the value");
    });
});
// it will check all cases
test("DELETE /api/files/:key", async () => {
  await supertest(app)
    .delete("/api/files/:key")
    .expect(200)
    .then(async () => {
      expect("Deleted");
    });
});
