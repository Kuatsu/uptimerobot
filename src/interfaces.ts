/** BASE TYPES */
export enum EStat {
  OK = 'ok',
  FAIL = 'fail',
}

export interface IBaseResponse {
  stat: EStat;
  pagination?: {
    offset: number;
    limit: number;
    total: number;
  };
}

/** ACCOUNT DETAILS */
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

export interface IGetAccountDetailsResponse extends IBaseResponse, IAccountDetailsModel {}

/** LOGS */
export enum ELogType {
  DOWN = 1,
  UP = 2,
  PAUSED = 99,
  STARTED = 98,
}

export interface ILogModel {
  type: ELogType;
  datetime: number;
  duration: number;
  reason: string;
}

/** MONITORS */
export enum EMonitorType {
  HTTP = 1,
  KEYWORD = 2,
  PING = 3,
  PORT = 4,
  HEARTBEAT = 5,
}

export enum EMonitorSubType {
  HTTP = 1,
  HTTPS = 2,
  FTP = 3,
  SMTP = 4,
  POP3 = 5,
  IMAP = 6,
  CUSTOM = 99,
}

export enum EMonitorKeywordType {
  EXISTS = 1,
  NOT_EXISTS = 2,
}

export enum EMonitorKeywordCaseType {
  SENSITIVE = 1,
  INSENSITIVE = 2,
}

export enum EMonitorHTTPAuthType {
  BASIC = 1,
  DIGEST = 2,
}

export enum EMonitorStatus {
  PAUSED = 0,
  NOT_CHECKED_YET = 1,
  UP = 2,
  SEEMS_DOWN = 8,
  DOWN = 9,
}

export enum EMonitorHTTPMethod {
  HEAD = 1,
  GET = 2,
  POST = 3,
  PUT = 4,
  PATCH = 5,
  DELETE = 6,
  OPTIONS = 7,
}

export enum EMonitorPostType {
  KEYVALUE = 1,
  RAW = 2,
}

export enum EMonitorPostContentType {
  TEXTHTML = 1,
  APPLICATIONJSON = 2,
}

export interface IMonitorModel {
  id: number;
  friendly_name: string;
  url: string;
  type: EMonitorType;
  sub_type: EMonitorSubType;
  keyword_type: EMonitorKeywordType;
  keyword_case_type: EMonitorKeywordCaseType;
  keyword_value: string;
  http_username?: string;
  http_password?: string;
  http_auth_type?: EMonitorHTTPAuthType;
  port?: number;
  interval: number;
  status: EMonitorStatus;
  all_time_uptime_ratio?: string;
  all_time_uptime_durations?: number;
  custom_down_durations?: number;
  custom_uptime_ranges?: number;
  average_response_time?: number;
  custom_http_headers?: Record<string, any>;
  custom_http_statuses?: string;
  http_method?: EMonitorHTTPMethod;
  post_type?: EMonitorPostType;
  post_value?: string;
  post_content_type?: EMonitorPostContentType;
  logs?: ILogModel[];
}

export interface IGetMonitorsResponse extends IBaseResponse {
  monitors: IMonitorModel[];
}
