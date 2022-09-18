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
  expect(response.account).toBeDefined();
  expect(response.account?.email).toBeDefined();
  expect(response.account?.monitor_limit).toBeDefined();
  expect(response.account?.monitor_interval).toBeDefined();
  expect(response.account?.up_monitors).toBeDefined();
  expect(response.account?.down_monitors).toBeDefined();
  expect(response.account?.paused_monitors).toBeDefined();
});

test('get monitors', async () => {
  const response = await uptimeRobotClient.getMonitors();

  expect(response.stat).toBe('ok');
  expect(response.monitors).toBeDefined();
  expect(response.monitors?.length).toBeGreaterThan(0);
  expect(response.monitors?.[0].id).toBeDefined();
  expect(response.monitors?.[0].friendly_name).toBeDefined();
  expect(response.monitors?.[0].url).toBeDefined();
  expect(response.monitors?.[0].type).toBeDefined();
  expect(response.monitors?.[0].sub_type).toBeDefined();
  expect(response.monitors?.[0].keyword_type).toBeDefined();
  expect(response.monitors?.[0].keyword_case_type).toBeDefined();
  expect(response.monitors?.[0].keyword_value).toBeDefined();
});
