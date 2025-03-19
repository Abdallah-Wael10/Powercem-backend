const asyncWrapper = require('../middleware/asyncwrapper');
const Contact = require('../model/contact.model');

// Create a new contact entry
const createContact = asyncWrapper(async (req, res) => {
    const contactData = req.body;

    const contact = new Contact(contactData);

    await contact.save();
    res.status(201).json({ message: 'Contact created successfully', contact });
});

// Get all contact entries
const getAllContacts = asyncWrapper(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// Get a single contact by ID
const getContactById = asyncWrapper(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(contact);
});

// Update a contact by ID
const updateContact = asyncWrapper(async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ message: 'Contact updated successfully', contact: updatedContact });
});

// Delete a contact by ID
const deleteContact = asyncWrapper(async (req, res) => {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
});

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
};