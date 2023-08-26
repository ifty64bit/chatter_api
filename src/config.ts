export default () => ({
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND || 10,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})
