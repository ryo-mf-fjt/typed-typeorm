import { DataSource } from 'typeorm';
import { User } from './user';

import 'reflect-metadata';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 9090,
  username: 'postgres',
  password: 'example',
  database: 'postgres',
  synchronize: true, // 一旦 true
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

const main = async () => {
  await appDataSource.initialize();

  const userRepository = appDataSource.getRepository(User);

  const user = new User();
  user.firstName = 'Timber';
  user.lastName = 'Saw';
  user.age = 25;
  await userRepository.save(user);

  const allUsers = await userRepository.find();
  const firstUser = await userRepository.findOneBy({
    id: 1,
  }); // find by id
  // eslint-disable-next-line no-console
  console.log(allUsers);
  // eslint-disable-next-line no-console
  console.log(firstUser);
  const timber = await userRepository.findOneBy({
    firstName: 'Timber',
    lastName: 'Saw',
  }); // find by firstName and lastName

  if (timber) {
    await userRepository.remove(timber);
  }

  await appDataSource.destroy();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
