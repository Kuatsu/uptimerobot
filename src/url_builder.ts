const DEFAULT_BASE_URL = 'https://api.uptimerobot.com';

export class UrlBuilder {
  constructor(private baseUrl = DEFAULT_BASE_URL) {}

  private buildUrl(path: string) {
    const url = new URL('/v2' + path, this.baseUrl);
    return url.toString();
  }

  public getAccountDetailsUrl() {
    return this.buildUrl('/getAccountDetails');
  }
}
