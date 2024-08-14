import mongoose from 'mongoose'
import Contact from './models/contact.js';

mongoose.connect('mongodb+srv://nishugujran:SSCWHC0iFgiVFwhG@socialmedia.e3zfjee.mongodb.net/');

const seedContacts = async () => {
  try {
    await Contact.deleteMany({});

    const contacts = [
      { email: 'john.doe@example.com', phoneNumber: '1234567890', linkPrecedence: 'primary' },
      { email: 'jane.doe@example.com', phoneNumber: '0987654321', linkPrecedence: 'primary' },
      { email: 'john.doe2@example.com', phoneNumber: '1234509876', linkedId: null, linkPrecedence: 'secondary' },
      { email: 'jane.doe2@example.com', phoneNumber: '0987612345', linkedId: null, linkPrecedence: 'secondary' },
      { email: 'john.doe3@example.com', phoneNumber: '1234512345', linkedId: null, linkPrecedence: 'secondary' },
      { email: 'john.doe@example.com', phoneNumber: '5555555555', linkedId: null, linkPrecedence: 'secondary' },
      { email: 'jane.doe@example.com', phoneNumber: '6666666666', linkedId: null, linkPrecedence: 'secondary' }
    ];

    for (const contact of contacts) {
      const newContact = new Contact(contact);
      await newContact.save();
    }

    console.log('Test data inserted successfully.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting test data:', error);
    mongoose.connection.close();
  }
};

seedContacts();
