import { createApp } from './create-app.test-helper';

describe('PageController', () => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  describe('mountApp', () => {
    it('should change when states binding or event trigger.', async () => {
      const { pageController, repositoryManager } = await createApp();

      repositoryManager.setValue('form1', ['deviceNumber'], 'Bob');

      // const textWidget = pageController.getWidget('w1');
      // const inputWidget = pageController.getWidget('w2');

      // expect(textWidget.getHTMLElement().getAttribute('value')).toEqual('Bob');
      // expect(inputWidget.getHTMLElement().getAttribute('value')).toEqual('Bob');

      // const input: HTMLInputElement =
      //   inputWidget.getHTMLElement() as HTMLInputElement;
      // input.value = 'Alice';
      // input.click();

      // expect(textWidget.getHTMLElement().getAttribute('value')).toEqual(
      //   'Alice',
      // );
      // expect(inputWidget.getHTMLElement().getAttribute('value')).toEqual(
      //   'Alice',
      // );
    });
  });

  describe('Listen router changed.', () => {
    it.only('mount the home and if the router is changed, should unmount home and mount the new page.', async () => {
      const { history, root, pageController, repositoryManager } =
        await createApp({
          initial: '/about',
        });
      // history.push(
      //   `/about?s=${encodeURIComponent(JSON.stringify({ name: 'Tom' }))}`,
      // );
      await sleep(1000);

      repositoryManager.setValue('form2', ['value'], 'nihao');
      // const textWidget = pageController.getWidget('w1');
      // console.log('rootss', root.innerHTML);
      // expect(textWidget.getHTMLElement().innerText).toEqual(
      //   'It is about page.',
      // );
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
