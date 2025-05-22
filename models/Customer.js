const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  applicationId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['未対応', '対応済み', 'ロスト'],
    default: '未対応'
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  modelNumber: String,
  hasAccessories: {
    type: Boolean,
    default: false
  },
  accessories: [String],
  condition: {
    type: String,
    enum: ['新品', '美品', '中古品', '中古', '未使用'],
    required: true
  },
  purchasePeriod: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nameKana: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  notes: String,
  denialStatus: {
    type: String,
    enum: ['', '否認'],
    default: ''
  },
  appraisalAmount: Number,
  memo: String,
  hasPhotos: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Customer', customerSchema); 
