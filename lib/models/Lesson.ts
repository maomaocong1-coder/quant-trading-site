import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
  },
  courseSlug: {
    type: String,
    required: [true, 'Please provide a course slug'],
  },
  moduleIndex: {
    type: Number,
    required: [true, 'Please provide a module index'],
  },
  order: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    default: '',
  },
  codeExamples: [{
    title: String,
    language: String,
    code: String,
    explanation: String,
  }],
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['article', 'video', 'book', 'tool'],
    },
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

LessonSchema.index({ courseSlug: 1, slug: 1 }, { unique: true });

LessonSchema.pre('save', async function () {
  this.updatedAt = new Date();
});

export default mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema);