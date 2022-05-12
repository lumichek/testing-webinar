import { register } from "../utils/auth-api";
import { AUTH_SERVER_URL } from "../utils/constants";

describe('check register function', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        {data: ['test']}
      ),
      ok: true,
    })
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should be success', async() => {
    const result = await register('email', 'password');
    expect(result).toEqual({data: ['test']});
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${AUTH_SERVER_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: 'email', password: 'password'})
    });
  });

  test('should be failed', async() => {
    fetch.mockImplementationOnce(() => Promise.resolve({
        ok: false,
        status: '500',
    }));

    await expect(register('email', 'password')).rejects.toBe('Ошибка: 500');
  });
})