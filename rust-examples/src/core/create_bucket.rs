use crate::core::client::create_client;

use aws_sdk_s3::error::SdkError;
use aws_sdk_s3::operation::create_bucket::CreateBucketError;

pub async fn s3_create_bucket() -> Result<(), SdkError<CreateBucketError>> {
    let client = create_client().await;
    
    match client.create_bucket()
        .bucket("Examples from S3")
        .send()
        .await {
            Ok(output) => {
                println!("✅ Bucket created: {}", output.location().unwrap_or("(no location)"));
                Ok(())
            },
            Err(err) => {
                println!("❌ Error creating bucket: {}", err);
                Err(err)
            }
    }
}
