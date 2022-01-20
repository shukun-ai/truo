import { parseToken } from './security.utils';

describe('gateway.utils', () => {
  it('parseToken normal', async () => {
    const token = parseToken(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpbGFsaGFpZGFyIiwiaWF0IjoxNTU1MjU3NDg0LCJleHAiOjE1NTUzMDA2ODR9.-wUfMaJ37gkM6OWqvKpNck5nQGV8SlGvl_DwddLkYJU',
    );

    expect(token).toEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpbGFsaGFpZGFyIiwiaWF0IjoxNTU1MjU3NDg0LCJleHAiOjE1NTUzMDA2ODR9.-wUfMaJ37gkM6OWqvKpNck5nQGV8SlGvl_DwddLkYJU',
    );
  });

  it('parseToken undefined', async () => {
    const token = parseToken(undefined);

    expect(token).toEqual(null);
  });

  it('parseToken empty', async () => {
    const token = parseToken('Bearer ');

    expect(token).toEqual(null);
  });
});
