import { Factory } from '@concepta/typeorm-seeding';
import { User } from 'src/typeorm';
export declare class useFactory extends Factory<User> {
    protected entity(): Promise<User>;
}
