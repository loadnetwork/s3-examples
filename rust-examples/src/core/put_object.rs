use crate::core::client::create_client;
use aws_sdk_s3::error::SdkError;
use aws_sdk_s3::operation::put_object::PutObjectError;
use bytes::Bytes;


pub async fn s3_put_object() -> Result<(), SdkError<PutObjectError>> {
    let client = create_client().await;
    let data = Bytes::from(vec![0, 1, 2, 3, 4]);
    
    match client.put_object()
        .bucket("BucketName")
        .key("data")
        .body(data.into())
        .send()
        .await {
            Ok(_) => {
                println!("✅ File uploaded: data");
                Ok(())
            },
            Err(err) => {
                println!("❌ Error uploading file: {}", err);
                Err(err)
            }
    }
}
