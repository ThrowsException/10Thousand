var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Update Schema
 */
var UpdateSchema = new Schema({
  date: {
      type: Date
  },
  hours: {
      type: Number
  },
  achievement_id: {
    type: Schema.ObjectId
  }
});

UpdateSchema.virtual('time_ms').get(function () {
  return this.date.getTime();
});

UpdateSchema.set('toObject', { getters: true, virtuals: true });
UpdateSchema.set('toJSON', { getters: true, virtuals: true });
