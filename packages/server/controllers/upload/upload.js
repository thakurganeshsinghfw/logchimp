const AWS = require('aws-sdk');
const uuid = require('uuid');
const logger = require("../../utils/logger");


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


const upload = async (req, res) => {
  try {
    const { url } = req.body;
    if(!url){
        return res.status(400).json({ error: "URL is required" });
    }

    const base64Data = url.split(',')[1];
    const ext = url.split(';')[0].split('/')[1];
    const fileName = `${uuid()}.${ext}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(base64Data, 'base64'),
      ContentType: `image/${ext}`, // Or video/* as needed
    };

    const data = await s3.upload(params).promise();
    res.json({ url: data.Location });
  } catch (error) {
    logger.error("Error uploading to S3:", error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

module.exports = { upload };
