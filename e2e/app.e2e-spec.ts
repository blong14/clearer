import { ZebraCliPage } from './app.po';

describe('zebra-cli App', () => {
  let page: ZebraCliPage;

  beforeEach(() => {
    page = new ZebraCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
