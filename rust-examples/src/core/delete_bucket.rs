use crate::core::client::create_client;

use aws_sdk_s3::error::SdkError;
use aws_sdk_s3::operation::delete_bucket::DeleteBucketError;

pub async fn s3_delete_bucket() -> Result<(), SdkError<DeleteBucketError>> {
    let client = create_client().await;
    
    match client.delete_bucket()
        .bucket("bucketname")
        .send()
        .await {
            Ok(_) => {
                println!("✅ Bucket deleted");
                Ok(())
            },
            Err(err) => {
                println!("❌ Error deleting bucket: {}", err);
                Err(err)
            }
    }
}
