import { getResponse } from "../utils/utils";

const testObject = {
  ok: true,
  json() {
    return {data: ['test']}
  }
}

describe('check getResponce function', () => {
  test('should be success', () => {
    const response = getResponse(testObject);

    expect(response).toEqual({data: ['test']});
  })

  test('should be failed', async() => {
    testObject.ok = false;
    testObject.status = 500;

    const response = getResponse(testObject);

    await expect(response).rejects.toEqual(`Ошибка: 500`);
  })
})