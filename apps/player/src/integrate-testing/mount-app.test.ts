import { createApp } from './create-app.test-helper';

describe('PageController', () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  describe('mountApp', () => {
    it('should change when states binding or event trigger.', async () => {
      const { root, repositoryManager } = await createApp();

      repositoryManager.setValue('form1', ['deviceNumber'], 'Bob');

      expect(root.innerHTML).toEqual(
        '<div><div value="Bob" data-qa="w1"></div><input value="Bob" data-qa="w2"></div>',
      );

      const input: HTMLInputElement = document.querySelector(
        '[data-qa="w2"]',
      ) as HTMLInputElement;
      input.value = 'Alice';
      input.click();

      expect(root.innerHTML).toEqual(
        '<div><div value="Alice" data-qa="w1"></div><input value="Alice" data-qa="w2"></div>',
      );
    });
  });

  describe('Listen router changed.', () => {
    it('mount the home and if the router is changed, should unmount home and mount the new page.', async () => {
      const { history, root, repositoryManager } = await createApp();
      history.push(
        `/about?s=${encodeURIComponent(JSON.stringify({ name: 'Tom' }))}`,
      );
      await sleep(1000);
      repositoryManager.setValue('form2', ['value'], '你好');
      expect(root.innerHTML).toEqual(
        '<div><div value="It is about page 你好." data-qa="w1"></div></div>',
      );
    });
  });

  // describe('Did not found page.', () => {
  //   it('If the new container is not defined, should return 404 page.', async () => {
  //     const { history, root, pageController, repositoryManager } =
  //       await createApp();
  //     history.push(`/profile`);
  //     expect(root.innerHTML).toEqual('404');
  //   });
  // });
});
