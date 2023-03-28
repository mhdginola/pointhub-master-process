import { config } from "dotenv";

config();

export interface IServerConfig {
  port: number;
}

const serverConfig: IServerConfig = {
  port: Number(process.env.PORT ?? 3000),
};

export default serverConfig;
