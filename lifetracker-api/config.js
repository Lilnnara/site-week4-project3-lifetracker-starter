require('dotenv').config();

function getDatabaseUri() {
    const { DATABASE_USER, DATABASE_PASS, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;
    return `postgresql://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
}

module.exports = {
    SECRET_KEY: process.env.SECRET_KEY,
    PORT: process.env.PORT,
    BCRYPT_WORK_FACTOR: process.env.BCRYPT_WORK_FACTOR,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASS: process.env.DATABASE_PASS,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_TEST_NAME: process.env.DATABASE_TEST_NAME,
    getDatabaseUri,
};
