import './tests/setup';
import { UptimeRobotClient } from './client';

let uptimeRobotClient: UptimeRobotClient;

beforeEach(() => {
  uptimeRobotClient = new UptimeRobotClient({
    apiKey: process.env.UPTIMEROBOT_TEST_API_TOKEN || '',
  });
});

test('api key is defined', () => {
  expect(uptimeRobotClient.config.apiKey).not.toEqual('');
});

test('get account details', async () => {
  const response = await uptimeRobotClient.getAccountDetails();

  expect(response.stat).toBe('ok');
  expect(response.account).toBeDefined();
  expect(response.account?.monitor_limit).toBeGreaterThan(0);
});

test('get monitors', async () => {
  const response = await uptimeRobotClient.getMonitors();

  console.log(response);

  expect(response.stat).toBe('ok');
  expect(response.monitors).toBeDefined();
  expect(response.monitors?.length).toBeGreaterThan(0);
  expect(response.monitors?.[0].id).toBeDefined();
});
