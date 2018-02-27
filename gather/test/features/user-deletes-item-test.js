const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');


describe('delete item', () => {
  describe('user clicks to remove item', () => {
    it('should not render', () => {

      // object with title, description and imageURL
      const item = buildItemObject();

      // exercise
      browser.url('/items/create');
      browser.setValue('input[id=title-input]', item.title);
      browser.setValue('textarea[id=description-input]', item.description);
      browser.setValue('input[id=imageUrl-input]', item.imageUrl);
      browser.click('button[type=submit]');

      browser.submitForm('.delete-form');

      // verify
      assert.notInclude(browser.getText('body'), item.title);
      assert.notInclude(browser.getAttribute('body img', 'src'), item.imageUrl);

    });
  });

});
