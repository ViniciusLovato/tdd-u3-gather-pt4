const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');


describe('Single page item', () => {
  describe('user creates a new item', () => {
    it('should appear on single page item', () => {

      // object with title, description and imageURL
      const item = buildItemObject();

      // exercise
      browser.url('/items/create');
      browser.setValue('input[id=title-input]', item.title);
      browser.setValue('textarea[id=description-input]', item.description);
      browser.setValue('input[id=imageUrl-input]', item.imageUrl);
      browser.click('button[type=submit]');

      browser.click('.item-card a');

      // verify
      assert.include(browser.getText('body'), item.title);
      assert.include(browser.getText('body'), item.description);
      assert.include(browser.getAttribute('body img', 'src'), item.imageUrl);

    });
  });

});
