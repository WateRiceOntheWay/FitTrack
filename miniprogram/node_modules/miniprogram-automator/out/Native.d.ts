/// <reference types="node" />
import Connection from './Connection';
import { EventEmitter } from 'events';
interface ISwitchTabOptions {
    /**
     * tabbar 路径，不带参数
     */
    url: string;
}
export default class Native extends EventEmitter {
    private connection;
    constructor(connection: Connection);
    /**
     * 跳转到小程序首页
     */
    goHome(): Promise<any>;
    /**
     * 回到上一页
     */
    navigateLeft(): Promise<any>;
    /**
     * 弹窗按钮点击确定
     */
    confirmModal(): Promise<any>;
    /**
     * 弹窗按钮点击取消
     */
    cancelModal(): Promise<any>;
    /**
     * 点击tabBar
     */
    switchTab(params: ISwitchTabOptions): Promise<any>;
    /**
     * 授权弹窗点击取消
     */
    authorizeCancel(): Promise<any>;
    /**
     * 授权弹窗点击确认
     */
    authorizeAllow(): Promise<any>;
    /**
     * 关闭支付弹窗
     */
    closePaymentDialog(): Promise<any>;
    /**
     * 分享弹窗点击取消
     */
    shareCancel(): Promise<any>;
    /**
     * 分享弹窗点击发送
     */
    shareConfirm(): Promise<any>;
    private send;
    private sendNative;
}
export {};
