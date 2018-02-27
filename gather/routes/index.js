const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

// Add additional routes below:
router.get('/items/create', async (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {

  const { title, description, imageUrl} = req.body;
  const item = new Item({ title, description, imageUrl });

  item.validateSync();

  if(item.errors){
    res.status(400).render('create', { newItem: item });
  }
  else {

    await item.save();

    res.redirect('/');
  }

})

router.get('/items/:id', async (req, res, next) => {
  const itemId = req.params.id;
  const item = await Item.findById(itemId);

  res.render('single', {item});
  
});

router.post('/items/:id/delete', async (req, res, next) => {
  const itemId = req.params.id;
  await Item.findByIdAndRemove(itemId);

  const items = await Item.find({});

  res.render('index', {items});
});


router.get('/items/:id/update', async (req, res, next) => {

  const itemId = req.params.id;  
  const item = await Item.findById(itemId);

  res.render('update', {item});
});

router.post('/items/:id/update', async (req, res, next) => {

  const itemId = req.params.id;  

  const { title, description, imageUrl} = req.body;
  const item = new Item({ title, description, imageUrl });

  await Item.findByIdAndUpdate({_id: itemId},{title, description, imageUrl})

  const items = await Item.find({})
  res.render('index', {items});
});

module.exports = router;
