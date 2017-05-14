import { LocationServicePage } from './app.po';

describe('location-service App', () => {
  let page: LocationServicePage;

  beforeEach(() => {
    page = new LocationServicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
