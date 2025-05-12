import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Replace these with your custom values
const accessKeyId = process.env.LOAD_ACCESS_KEY;
const secretAccessKey = "";

const s3Client = new S3Client({
    region: "us-east-1", // Region is still required, even for custom endpoints
    endpoint: "https://s3.load.rs",
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    forcePathStyle: true, // Required for most S3-compatible services like MinIO
});

async function uploadFile(bucketName, fileName, body) {
    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: body,
        });

        const result = await s3Client.send(command);
        console.log("✅ File uploaded:", fileName);
        return result;
    } catch (error) {
        console.error("❌ Error uploading file:", error);
    }
}

uploadFile("BucketName", "data.data", new Uint8Array([0,1,2,3,4]));