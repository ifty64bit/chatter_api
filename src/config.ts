export default () => ({
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND || 10,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    GOOGLE_APPLICATION_CREDENTIALS: process.env
        .GOOGLE_APPLICATION_CREDENTIALS as string,
    private_key_id: process.env.PRIVATE_KEY_ID as string,
    private_key: process.env.PRIVATE_KEY as string,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL as string,
})
