

import 'dotenv/config';

import * as joi from 'joi';

enum NodeEnv {
    DEVELOPMENT = 'development',
    STAGING = 'staging',
    PRODUCTION = 'production'
}

interface EnvVars_I {

    PORT: number;

    NATS_SERVERS: string[];

    NODE_ENV: NodeEnv;

    DB_PASSWORD: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;

    EMAIL_HOST: string;
    EMAIL_PORT: number;
    EMAIL_SECURE: boolean;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    EMAIL_SERVICE: string;

    WEB_URL: string;

}

const envsSchema = joi.object({
    PORT: joi.number().required(),

    NATS_SERVERS: joi.array().items(joi.string()),


    NODE_ENV: joi.string().valid(NodeEnv.DEVELOPMENT, NodeEnv.STAGING, NodeEnv.PRODUCTION).required(),

    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),

    EMAIL_HOST: joi.string().required(),
    EMAIL_PORT: joi.number().required(),
    EMAIL_SECURE: joi.boolean().required(),
    EMAIL_USER: joi.string().required(),
    EMAIL_PASS: joi.string().required(),
    EMAIL_SERVICE: joi.string(),

    WEB_URL: joi.string().required()


}).unknown(true);

const {
    error,
    value
} = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if (error) {

    throw new Error(`Config validation error: ${error.message}`);

}

const envVars: EnvVars_I = value;

export const envs = {
    port: envVars.PORT,

    natsServers: envVars.NATS_SERVERS,

    nodeEnv: envVars.NODE_ENV,

    db_password: envVars.DB_PASSWORD,
    db_name: envVars.DB_NAME,
    db_host: envVars.DB_HOST,
    db_port: envVars.DB_PORT,
    db_username: envVars.DB_USERNAME,

    email_host: envVars.EMAIL_HOST,
    email_port: envVars.EMAIL_PORT,
    email_secure: envVars.EMAIL_SECURE,
    email_user: envVars.EMAIL_USER,
    email_pass: envVars.EMAIL_PASS,
    email_service: envVars.EMAIL_SERVICE,
    web_url: envVars.WEB_URL

}