import { SessionOptions } from "express-session";

export const sessionConfig: SessionOptions = {
    cookie: {
        maxAge: 60000 * 60 * 24,
    },
    secret: 'jdsjfkldjfkld', //keep this an actual secret pls!!
    resave: false,
    saveUninitialized: false,
};