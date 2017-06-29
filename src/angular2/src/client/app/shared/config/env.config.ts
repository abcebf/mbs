
export interface IConfig {
  API: string;
}

export const Config: IConfig = JSON.parse('<%= ENV_CONFIG %>');
