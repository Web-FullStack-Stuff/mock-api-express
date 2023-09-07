import express from 'express'
import { nanoid } from 'nanoid'

const router = express.Router()

import '../util/db_conn.js'
import TestModel from '../schema/test.model.js'

router.get('/hello', (req, res) => {
  res.send('Hello World!')
})


router.get('/', async (req, res) => {
  const testers = await TestModel.find({});
  try {
    res.send(testers);
  } catch (error) {
    res.status(500).send(error);
  }
})

// Get a single 
router.get("/:id", async (req, res) => {
  const testId = req.params.id
  try {
    const tester = await TestModel.findOne({testId}).exec();
    res.send(tester);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  let data = req.body
  if (!data.testId) {
    data.testId = nanoid()
  }
  const tester = new TestModel(data)
  try {
    await tester.save();
    res.send(tester);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update test
router.put("/:id", async (req, res) => {
  const testId = req.params.id
  const update = req.body
  try {
    const test = await TestModel.findOneAndUpdate({testId}, update, {
      new: true
    });
    res.send(test);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router