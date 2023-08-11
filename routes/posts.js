var express = require("express");
const Post = require("../models/Post");
const router = express.Router();

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream } = require("../s3");

// get data from aws s3 bucket
router.get("/files/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});
// post data to aws s3 bucket and local holder
router.post("/files", upload.single("image"), async (req, res) => {
  const file = req.file;

  // uploading image
  if (file !== undefined) {
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    res.send({ imagePath: `/images/${result.Key}` });
  } else {
    res.send("File Not Found");
  }
});

// delete data from awsS3 bucket

router.delete("/files/:key", async (req, res) => {
  const filename = req.params.key;
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  await s3
    .deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: filename })
    .promise();
  res.send("File Deleted Successfully");
});

module.exports = router;
