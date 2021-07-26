module.exports = {
    server: {
        port: 8080,
        apiBaseUrl: "http://localhost:8080/",
        adminBaseUrl: "http://angular-admin-demo.s3-website.eu-central-1.amazonaws.com",
        runCron: false,
        debug: true
    },
    bcrypt: {
        saltRounds: 10
    },
    jwt: {
        secret: "maKLdM89swBjjFETCd5mD"
    },
    mongodbUri: "mongodb://localhost:27017/url_shortener",



};
