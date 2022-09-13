import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUninitDto } from "./dtos/CreateUninit.dto";
import Uninitialized from "./uninitialized.entity";

@Injectable()
export class UninitService {
    constructor(
        @InjectRepository(Uninitialized)
        private readonly uninitRepo: Repository<Uninitialized>
    ) {}

    findUninit(intraID: string) {
        return this.uninitRepo.findOne({ where: {intraID} })
    }

    createUninit(createUninitDto: CreateUninitDto) { // should this be async?
        if (!this.findUninit(createUninitDto.intraID))
          return ;
        const newUser = this.uninitRepo.create(createUninitDto);
        return this.uninitRepo.save(newUser);
      }
    
    removeUninit(intraID: string) {
        const ret = this.uninitRepo
            .createQueryBuilder('uninitialized')
            .delete()
            .from('Uninitialized')
            .where('intraID =:intraID', { intraID })
            .execute()
        return ret;
    }
}
