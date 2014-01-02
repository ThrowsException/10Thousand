/**
 * Module dependencies.
 */
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
  }
});

UpdateSchema.virtual('time_ms').get(function () {
  return this.date.getTime();
});

UpdateSchema.set('toObject', { getters: true, virtuals: true });
UpdateSchema.set('toJSON', { getters: true, virtuals: true });

/**
 * Article Schema
 */
var AchievementSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
  updates: [UpdateSchema],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
AchievementSchema.path('name').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

mongoose.model('Update', UpdateSchema);
mongoose.model('Achievement', AchievementSchema);
