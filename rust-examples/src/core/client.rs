use aws_sdk_s3::Client;

pub async fn create_client() -> Client {
    let config = aws_config::from_env()
        .endpoint_url("https://s3.load.rs")
        .region("eu-west-2")
        .load()
        .await;

    let s3_config = aws_sdk_s3::config::Builder::from(&config)
        .force_path_style(true)
        .build();

    Client::from_conf(s3_config)
}