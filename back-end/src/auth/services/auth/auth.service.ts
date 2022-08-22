import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthenticationProvider } from './auth';

@Injectable()
export class AuthService implements AuthenticationProvider {
    constructor(@InjectRepository(User) private userRepo: 
    Repository<User>)  {}

    async validateUser(details: UserDetails) {
        const { intraId } = details;
        const user = await this.userRepo.findOne({
            where: {
            intraId: intraId
        }
        });
        console.log(user);
        if (user) {
            await this.userRepo.update({ intraId }, details);
            console.log('Updated');
            return user;
        }
        return this.createUser(details);
    }
    createUser(details: UserDetails) {
        console.log('Creating User');
        const user = this.userRepo.create(details);
        return this.userRepo.save(user);
    }
    findUser() {
        throw new Error('Method not implemented.');
    }
    
}
