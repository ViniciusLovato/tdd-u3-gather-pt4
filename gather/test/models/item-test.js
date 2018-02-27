const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('title', () => {
    it('should be a string', async () => {
      const nonStringTitle = 1;
      const item = {
        title: nonStringTitle
      }

      const createdItem = new Item(item);

      assert.strictEqual(createdItem.title, nonStringTitle.toString());


    })

    it('should be a required field', async () => {
      const item = new Item({title: ''});
      item.validateSync();
      assert.strictEqual(item.errors.title.message, 'Path `title` is required.');

    })
  })

  describe('description', () => {
    it('should be a required field', async () => {
      const item = new Item({ description : ''})
      item.validateSync();
      assert.strictEqual(item.errors.description.message, 'Path `description` is required.');
    })
  })

  describe('imageUrl', () => {
    it('should be a required field', async () => {
      const item = new Item({imageUrl : ''});
      item.validateSync();
      assert.strictEqual(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
    });
  })

});
