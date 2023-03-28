import { config } from "dotenv";

config();

export interface IAppConfig {
  name: string;
}

const appConfig: IAppConfig = {
  name: process.env.APP_NAME ?? "",
};

export default appConfig;
