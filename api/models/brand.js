const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
<<<<<<< HEAD
    slug: { type: String, unique: true },
=======
    slug: { type: String, required: true, unique: true },
>>>>>>> 92665f4af9d8716505717807256550ed16f0f179
    createdAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

module.exports = mongoose.model('Brand', brandSchema);