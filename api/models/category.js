const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    parent: { type: String },
    createdAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
<<<<<<< HEAD
=======
    updatedAt: Date,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
>>>>>>> 92665f4af9d8716505717807256550ed16f0f179
});

module.exports = mongoose.model('Category', categorySchema);