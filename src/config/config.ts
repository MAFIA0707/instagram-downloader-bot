import{ config } from 'dotenv'
config()


export default {
    TOKEN: process.env.TOKEN as string,
    XRapidAPIKey: process.env.XRapidAPIKey as string,
    XRapidAPIHost: process.env.XRapidAPIHost as string,
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT,
}