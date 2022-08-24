import { randEmail, randFullName, randPassword } from '@ngneat/falso';
import { define } from 'typeorm-seeding';
import { User } from 'src/typeorm';

define(User, () => {
  const user = new User();
  user.username = randFullName();
  user.email = randEmail();
  return user;
});
