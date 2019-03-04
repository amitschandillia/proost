import mongoose from 'mongoose';

const fooSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Foo', fooSchema);
