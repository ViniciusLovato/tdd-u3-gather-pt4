const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');


describe('update page item', () => {
  describe('user updates a new item', () => {
    it('new info should appear on single page item', () => {

      // object with title, description and imageURL
      const item = buildItemObject();
      const newTitle = 'new title';

      // exercise
      browser.url('/items/create');
      browser.setValue('input[id=title-input]', item.title);
      browser.setValue('textarea[id=description-input]', item.description);
      browser.setValue('input[id=imageUrl-input]', item.imageUrl);
      browser.click('button[type=submit]');

      browser.click('.item-card a');
      browser.click('.update-button');

      browser.setValue('input[id=title-input]', newTitle);
      browser.setValue('textarea[id=description-input]', item.description);
      browser.setValue('input[id=imageUrl-input]', item.imageUrl);
      browser.click('button[type=submit]');

      // verify
      assert.include(browser.getText('body'), newTitle);


    });
  });

});
