import { dependencies } from './dependencies';
import { ApiError } from './error';
import { IAccountDetailsModel, IBaseResponse } from './interfaces';
import { UrlBuilder } from './url_builder';

export type ClientConfig = {
  apiKey: string;
  baseUrl?: string;
};

export class UptimeRobotClient {
  readonly config: ClientConfig;
  readonly urlBuilder: UrlBuilder;

  constructor({ apiKey, baseUrl }: ClientConfig) {
    this.config = {
      apiKey,
      baseUrl,
    };
    this.urlBuilder = new UrlBuilder(baseUrl);
  }

  private async request<ResponseBody>(url: string | URL, data: Record<string, any> = {}, options: RequestInit = {}) {
    const dataWithApiKey: Record<string, any> = {
      api_key: this.config.apiKey,
      format: 'json',
      ...data,
    };
    let formBody = [];
    for (const property in dataWithApiKey) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(dataWithApiKey[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    const response = await dependencies.fetch(url.toString(), {
      ...options,
      body: formBody.join('&'),
      method: options.method || 'POST', // uptimerobot uses post in every request
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
        ...options.headers,
      },
    });
    let body;
    let error;

    try {
      body = await response.json();
    } catch (err: any) {
      error = err;
    }

    if (body?.error !== undefined) {
      error = new ApiError(body.error.message, body);

      throw error;
    }
    if (response.ok === false || error) {
      const message = error?.message ?? body?.error?.message;

      throw new ApiError(message, body);
    }

    return body as IBaseResponse & Partial<ResponseBody>;
  }

  /**
   * Account details (max number of monitors that can be added and number of up/down/paused monitors) can be grabbed using this method.
   * @see https://uptimerobot.com/#getAccountDetailsWrap
   */
  async getAccountDetails() {
    const url = this.urlBuilder.getAccountDetailsUrl();

    return this.request<IAccountDetailsModel>(url);
  }
}
