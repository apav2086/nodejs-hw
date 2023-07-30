const express = require('express');
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const router = express.Router()

router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  const [data, status] = await getContactById(req.params.contactId);
  res.json(data);
  res.status(status);
  res.json({ message: "Not found" })
})

router.post('/', async (req, res, next) => {
  const [data, status] = await addContact(req.body);
  res.json(data);
  res.status(status);
  res.json({ message: "missing required name field" })
})

router.delete('/:contactId', async (req, res, next) => {
  const [data, status] = await removeContact(req.params.contactId, req.body)
  res.json(data);
  res.status(status);
  res.json({ message: "contact deleted" })
})

router.put('/:contactId', async (req, res, next) => {
  const [data, status] = await updateContact(req.params.contactId, req.body)
  res.json(data);
  res.status(status);
  res.json({ message: 'template message' })
})

module.exports = router;
