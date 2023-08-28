import config from "./config"

export default {
    type: "service_account",
    project_id: "chatter-fd06e",
    private_key_id: config().private_key_id,
    private_key: config().private_key,
    client_email:
        "firebase-adminsdk-gaerl@chatter-fd06e.iam.gserviceaccount.com",
    client_id: "104820527627158540354",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: config().client_x509_cert_url,
    universe_domain: "googleapis.com",
}
