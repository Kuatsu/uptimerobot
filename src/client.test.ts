import './tests/setup';
import { UptimeRobotClient } from './client';
import { ApiError } from './error';
import { FetchError } from 'node-fetch';

let uptimeRobotClient: UptimeRobotClient;

beforeEach(() => {
  uptimeRobotClient = new UptimeRobotClient({
    apiKey: process.env.UPTIMEROBOT_TEST_API_TOKEN || '',
  });
});

test('api key is defined', () => {
  expect(uptimeRobotClient.config.apiKey).not.toEqual('');
});

test('should throw ApiError when api key is invalid', async () => {
  const client = new UptimeRobotClient({
    apiKey: 'invalid',
  });

  await expect(client.getAccountDetails()).rejects.toThrowError(ApiError);
});

test('should throw FetchError when calling an invalid base url', async () => {
  const client = new UptimeRobotClient({
    apiKey: process.env.UPTIMEROBOT_TEST_API_TOKEN || '',
    baseUrl: 'https://invalid',
  });

  await expect(client.getAccountDetails()).rejects.toThrowError(FetchError);
});

test('get account details', async () => {
  const response = await uptimeRobotClient.getAccountDetails();

  expect(response.stat).toBe('ok');
  assertAccountDetails(response);
});

test('get monitors', async () => {
  const response = await uptimeRobotClient.getMonitors();

  expect(response.stat).toBe('ok');
  expect(response.monitors).toBeDefined();
  expect(response.monitors?.length).toBeGreaterThan(0);
  assertMonitor(response.monitors?.[0]);
});

function assertAccountDetails(data: any) {
  expect(data.account).toBeDefined();
  expect(data.account?.email).toBeDefined();
  expect(data.account?.monitor_limit).toBeDefined();
  expect(data.account?.monitor_interval).toBeDefined();
  expect(data.account?.up_monitors).toBeDefined();
  expect(data.account?.down_monitors).toBeDefined();
  expect(data.account?.paused_monitors).toBeDefined();
}

function assertMonitor(data: any) {
  expect(data.id).toBeDefined();
  expect(data.friendly_name).toBeDefined();
  expect(data.url).toBeDefined();
  expect(data.type).toBeDefined();
  expect(data.sub_type).toBeDefined();
  expect(data.keyword_type).toBeDefined();
  expect(data.keyword_case_type).toBeDefined();
  expect(data.keyword_value).toBeDefined();
}
