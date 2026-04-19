import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  estimatedHours: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  modules: [{
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    lessons: [{
      title: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      order: {
        type: Number,
        default: 0,
      },
    }],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

CourseSchema.pre('save', async function () {
  this.updatedAt = new Date();
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);