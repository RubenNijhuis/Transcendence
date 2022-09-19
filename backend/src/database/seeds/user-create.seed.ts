import { Factory, Seeder } from '@concepta/typeorm-seeding';
import { User } from 'src/bootstrap/typeorm';
import { useFactory } from '../factories/user.factory';

export class UserSeeder extends Seeder {
  async run() {
    const userfact = this.factory(useFactory);

    for (var i = 1; i <= 200; i++) {
      var user = await userfact.make({ rank: i })
      await userfact.save(user);
    }
  }
}
