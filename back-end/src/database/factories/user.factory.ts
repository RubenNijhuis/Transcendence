import { randEmail, randFullName, randPassword } from '@ngneat/falso';
import { Factory } from '@concepta/typeorm-seeding';
import { User } from 'src/typeorm';

export class useFactory extends Factory<User> {
  protected async entity(): Promise<User> {
    const user = new User()
    user.username = randFullName()
    return user
  }
}