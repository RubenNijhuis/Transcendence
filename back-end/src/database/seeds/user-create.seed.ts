import { User } from 'src/typeorm';
import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // await getManager().query('TRUNCATE users');
    // await factory(User)().create({
    //   username: 'Amitav Roy',
    //   email: 'reachme@amitavroy.com',
    // });
    await factory(User)().createMany(20);
  }
}