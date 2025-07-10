import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

async function uploadFile(bucketName) {
  const key = "filename.turbo"; // The name (key) the file will be stored under (object name)
  const fileContent = new Uint8Array([0, 1, 2, 3, 4]); // Example file content in bytes
  const accessKeyId = process.env.LOAD_ACCESS_KEY;
  const secretAccessKey = ""; /// meant to be empty

  const s3Client = new S3Client({
    region: "eu-west-2",
    endpoint: "https://s3.load.rs",
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
    forcePathStyle: true,
  });

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      Metadata: {
        "uploader-api": "turbo", // to push object to Arweave
      },
    });

    const result = await s3Client.send(command);
    console.log("✅ File uploaded:", key);
    console.log(result);
    return result;
  } catch (error) {
    console.error("❌ Error uploading file:", error);
  }
}

uploadFile("your-bucket-name");
