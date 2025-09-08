// // declare const process: {
// //   env: Record<string, string | undefined>;
// //   exit(code?: number): never;
// // };
// In your seed.ts file, add this at the beginning
declare const process: {
  env: Record<string, string | undefined>;
  exit(code?: number): never;
};
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();

// async function main() {
//   // Create admin user
//   const adminPassword = await bcrypt.hash('admin123', 12);
//   const admin = await prisma.user.upsert({
//     where: { email: 'admin@example.com' },
//     update: {},
//     create: {
//       email: 'admin@example.com',
//       password: adminPassword,
//       role: 'ADMIN',
//     },
//   });

//   // Create regular user
//   const userPassword = await bcrypt.hash('user123', 12);
//   const user = await prisma.user.upsert({
//     where: { email: 'user@example.com' },
//     update: {},
//     create: {
//       email: 'user@example.com',
//       password: userPassword,
//       role: 'USER',
//     },
//   });

//   // Create classes
//   const yogaClass = await prisma.class.create({
//     data: {
//       name: 'Yoga Basics',
//       description: 'Beginner yoga class for all ages',
//     },
//   });

//   const pilatesClass = await prisma.class.create({
//     data: {
//       name: 'Pilates Core',
//       description: 'Strengthen your core with pilates',
//     },
//   });

//   // Create sessions
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   const session1 = await prisma.session.create({
//     data: {
//       classId: yogaClass.id,
//       date: tomorrow,
//       capacity: 15,
//     },
//   });

//   const session2 = await prisma.session.create({
//     data: {
//       classId: pilatesClass.id,
//       date: new Date(tomorrow.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days later
//       capacity: 10,
//     },
//   });

//   console.log('Database seeded successfully!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });



import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
    },
  });

  // Create classes
  const yogaClass = await prisma.class.create({
    data: {
      name: 'Yoga Basics',
      description: 'Beginner yoga class for all ages',
    },
  });

  const pilatesClass = await prisma.class.create({
    data: {
      name: 'Pilates Core',
      description: 'Strengthen your core with pilates',
    },
  });

  // Create sessions
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const session1 = await prisma.session.create({
    data: {
      classId: yogaClass.id,
      date: tomorrow,
      capacity: 15,
    },
  });

  const session2 = await prisma.session.create({
    data: {
      classId: pilatesClass.id,
      date: new Date(tomorrow.getTime() + 2 * 24 * 60 * 60 * 1000),
      capacity: 10,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });