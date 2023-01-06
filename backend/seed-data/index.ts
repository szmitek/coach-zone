import { exercises } from './data';

export async function insertSeedData(ks: any) {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;

  console.log(`🌱 Inserting Seed Data: ${exercises.length} Exercises`);
  const { mongoose } = adapter;
  for (const exercise of exercises) {
    console.log(`  🛍️ Adding Exercise: ${exercise.name}`);
    const { _id } = await mongoose
      .model('ExerciseImage')
      .create({ image: exercise.photo, altText: exercise.description });
    exercise.photo = _id;
    await mongoose.model('Exercise').create(exercise);
  }
  console.log(`✅ Seed Data Inserted: ${exercises.length} Exercises`);
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
  process.exit();
}
