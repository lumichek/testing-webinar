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
})