import { config } from "dotenv";

config();

export default {
  name: process.env.APP_NAME,
};
