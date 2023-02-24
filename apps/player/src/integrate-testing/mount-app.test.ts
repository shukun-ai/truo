import { createApp } from './create-app.test-helper';

describe('PageController', () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  describe('mountApp', () => {
    it('should change when states binding or event trigger.', async () => {
      const { pageController, repositoryManager } = await createApp();

      repositoryManager.setValue('form1', ['deviceNumber'], 'Bob');

      const textWidget = pageController.getWidget('home', 'w1');
      const inputWidget = pageController.getWidget('home', 'w2');

      expect(textWidget.getHTMLElement().getAttribute('value')).toEqual('Bob');
      expect(inputWidget.getHTMLElement().getAttribute('value')).toEqual('Bob');

      const input: HTMLInputElement =
        inputWidget.getHTMLElement() as HTMLInputElement;
      input.value = 'Alice';
      input.click();

      expect(textWidget.getHTMLElement().getAttribute('value')).toEqual(
        'Alice',
      );
      expect(inputWidget.getHTMLElement().getAttribute('value')).toEqual(
        'Alice',
      );
    });
  });

  describe('Listen router changed.', () => {
    it.only('mount the home and if the router is changed, should unmount home and mount the new page.', async () => {
      const { history, pageController } = await createApp({
        initial: '/about',
      });
      history.push(
        `/about?s=${encodeURIComponent(JSON.stringify({ name: 'Tom' }))}`,
      );
      await sleep(1000);
      const textWidget = pageController.getWidget('home', 'w9');
      expect(textWidget.getHTMLElement().innerText).toEqual(
        'It is about page.',
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
