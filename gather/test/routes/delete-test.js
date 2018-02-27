const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');


describe('Server path: /items/:itemId/delete', () => {

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('POST', () => {
    it('deletes an item from the database', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
      .post(`/items/${item._id}/delete`);

      const itemFound = await Item.findById(item._id);


      assert.isNull(itemFound);
      
    })
  })


});
