const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app)
        .get(`/items/create`);

      assert.equal(parseTextFromHTML(response.text, '#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, '#imageUrl-input'), '');
      assert.equal(parseTextFromHTML(response.text, '#description-input'), '');
      
    })
  })

  describe('POST', () => {
    it('creates a new item and saves it to database', async () => {
      const item = buildItemObject();

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);

      
      const createdItem = await Item.findOne(item);

      assert.isNotNull(createdItem);

       

      

    })

    it('creates a new item and redirects the user', async () => {
      const item = buildItemObject();

      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);

      // verify for redirect status code
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    })

    it('items without title should not be saved', async () => {
      const item = {
        description: 'test',
        imageUrl: 'https://www.placebear.com/200/300',
      }

      const response = await request(app)
      .post('/items/create')
      .type('form')
      .send(item);

      assert.deepEqual(await Item.find({}), [])
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })

    it('items without description should not be saved', async () => {
      const item = {
        title: 'my title',
        imageUrl: 'https://www.placebear.com/200/300',
      }

      const response = await request(app)
      .post('/items/create')
      .type('form')
      .send(item);

      assert.deepEqual(await Item.find({}), []);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })

    it('items without imageUrl should not be saved', async () => {
      const item = {
        title: 'my title',
        description: 'random'
      }

      const response = await request(app)
      .post('/items/create')
      .type('form')
      .send(item);

      assert.deepEqual(await Item.find({}), []);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    })
  })


});
