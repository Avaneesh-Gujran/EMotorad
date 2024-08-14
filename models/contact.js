import mongoose from 'mongoose'
const Schema =mongoose.Schema;

const contactSchema = new Schema({
    phoneNumber:{
        type:String,
        required: false
    },
    email:{
        type:String,
        required:false,
    },
    linkedinId:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Contact'
    },
    linkPrecedence: {
        type: String,
        enum: ['primary', 'secondary'],
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      deletedAt: {
        type: Date,
        required: false
      }
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;