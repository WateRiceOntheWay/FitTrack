import MiniProgram from './MiniProgram';
export interface IConnectOptions {
    wsEndpoint: string;
}
export interface ILaunchOptions {
    cliPath?: string;
    timeout?: number;
    port?: number;
    account?: string;
    ticket?: string;
    projectConfig?: any;
    projectPath: string;
    trustProject?: boolean;
    args?: string[];
    cwd?: string;
}
export default class Launcher {
    launch(options: ILaunchOptions): Promise<MiniProgram>;
    connect(options: IConnectOptions): Promise<MiniProgram>;
    private extendProjectConfig;
    private connectTool;
    private resolveCliPath;
}
