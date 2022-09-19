import { randEmail, randFullName, randPassword, randSkill } from '@ngneat/falso';
import { Factory } from '@concepta/typeorm-seeding';
import { FriendList, User } from 'src/bootstrap/typeorm';

export class useFactory extends Factory<User> {
  protected async entity(): Promise<User> {
    const user = new User()
    user.username = randFullName()
    return user
  }
}
