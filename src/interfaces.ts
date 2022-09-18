export interface IBaseResponse {
  stat: 'ok' | 'fail';
}

export interface IAccountDetailsModel {
  account: {
    email: string;
    monitor_limit: number;
    monitor_interval: number;
    up_monitors: number;
    down_monitors: number;
    paused_monitors: number;
  };
}
