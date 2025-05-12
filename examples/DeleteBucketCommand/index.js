import { S3Client, DeleteBucketCommand } from "@aws-sdk/client-s3";

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

async function deleteBucket(bucketName) {
    try {
        const command = new DeleteBucketCommand({ Bucket: bucketName });
        const result = await s3Client.send(command);
        console.log("✅ Bucket deleted:", bucketName);
    } catch (error) {
        console.error("❌ Error deleting bucket:", error);
    }
}

deleteBucket("BucketName");