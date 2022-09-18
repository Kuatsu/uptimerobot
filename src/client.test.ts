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
