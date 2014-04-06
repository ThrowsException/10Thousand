module.exports = {
    db: "mongodb://localhost/ten-thousand-dev",
    app: {
        name: "Ten Thousand"
    },
    facebook: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "1054789771996-n8m4lfo4f98musj8i52q04fn0up8qddt.apps.googleusercontent.com",
        clientSecret: "_eG8nOTl57gwZxAzz4IWo1EA",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}