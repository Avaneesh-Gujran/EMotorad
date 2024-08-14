import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Contact from './models/contact.js';


const app = new express();

app.use(bodyParser.json());
mongoose.connect('mongodb+srv://nishugujran:SSCWHC0iFgiVFwhG@socialmedia.e3zfjee.mongodb.net/');

app.post('/identify', async (req, res) => {
    const { email, phoneNumber } = req.body;
  
    try {
      const contacts = await Contact.find({
        $or: [
          { email: email },
          { phoneNumber: phoneNumber }
        ]
      });
  
      let primaryContact = null;
      let secondaryContacts = [];
  
      if (contacts.length === 0) {
        primaryContact = new Contact({
          email: email,
          phoneNumber: phoneNumber,
          linkPrecedence: 'primary'
        });
        await primaryContact.save();
      } else {
        for (let contact of contacts) {
          if (contact.linkPrecedence === 'primary') {
            primaryContact = contact;
          } else {
            secondaryContacts.push(contact);
          }
        }
  
        if (!primaryContact) {
          primaryContact = secondaryContacts[0];
          primaryContact.linkPrecedence = 'primary';
          await primaryContact.save();
        }
  
        const newSecondaryContact = new Contact({
          email: email,
          phoneNumber: phoneNumber,
          linkedId: primaryContact._id,
          linkPrecedence: 'secondary'
        });
  
        await newSecondaryContact.save();
        secondaryContacts.push(newSecondaryContact);
      }
  
      const response = {
        primaryContactId: primaryContact._id,
        emails: Array.from(new Set([primaryContact.email, ...secondaryContacts.map(c => c.email), email])),
        phoneNumbers: Array.from(new Set([primaryContact.phoneNumber, ...secondaryContacts.map(c => c.phoneNumber), phoneNumber])),
        secondaryContactIds: secondaryContacts.map(c => c._id)
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.get('/contacts', async (req, res) => {
    const emails = req.query.emails ? req.query.emails.split(',') : [];
  
    try {
      const contacts = await Contact.find({
        email: { $in: emails }
      });
  
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
const PORT = process.env.PORT || 3200
app.listen(PORT,()=>{
    console.log("Hello World");
    console.log(`This is the PORT: ${PORT} `)
})







