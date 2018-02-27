const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('user visits the create page', () =>{
  describe('posts a new item', () => {
    it('should be rendered in the page', () => {

      // setupcode
      // object with title, description and imageURL
      const item = buildItemObject();

      // exercise
      browser.url('/items/create');
      browser.setValue('input[id=title-input]', item.title);
      browser.setValue('textarea[id=description-input]', item.description);
      browser.setValue('input[id=imageUrl-input]', item.imageUrl);
      browser.click('button[type=submit]');

      // verify
      assert.include(browser.getText('body'), item.title);
      assert.include(browser.getAttribute('body img', 'src'), item.imageUrl);
      
      


    })
  })
})

