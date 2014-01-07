/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var AchievementSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updates: [{
    type: Schema.Types.ObjectId,
    ref: 'Update'
  }]
});

/**
 * Validations
 */
AchievementSchema.path('name').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

mongoose.model('Achievement', AchievementSchema);