import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseSlug: {
    type: String,
    required: true,
  },
  completedLessons: [{
    type: String,
  }],
  lastAccessedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProgressSchema.index({ userId: 1, courseSlug: 1 }, { unique: true });

ProgressSchema.pre('save', async function () {
  this.updatedAt = new Date();
});

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);