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
