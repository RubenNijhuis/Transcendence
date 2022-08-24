import { Seeder } from '@concepta/typeorm-seeding';
import { useFactory } from '../factories/user.factory';

// export class UserCreateSeed implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<void> {
//     // await getManager().query('TRUNCATE users');
//     // await factory(User)().create({
//     //   username: 'Amitav Roy',
//     //   email: 'reachme@amitavroy.com',
//     // });
//     await factory(User)().createMany(20);
//   }

export class UserSeeder extends Seeder {
  async run() {
    await this.factory(useFactory).createMany(20);
  }
}
