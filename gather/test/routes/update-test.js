const {assert} = require('chai');
const request = require('supertest');
const Item = require('../../models/item');


const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/update', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('renders the correct item', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
      .get(`/items/${item._id}/update`);
      
      assert.include(response.text, item.title);
      assert.include(response.text, item.description);

      
    })
  })

  describe('POST', () => {
    it('updates the correct item', async () => {
      const item = await seedItemToDatabase();

      const updateItemProperties = {
        title: item.title,
        description: 'new description',
        imageUrl: item.imageUrl
      }

      const response = await request(app)
      .post(`/items/${item._id}/update`)
      .type('form')
      .send(updateItemProperties);

      const updatedItem = await Item.findById(item._id);
      assert.strictEqual(updatedItem.description, updateItemProperties.description);

    })
  })

});
