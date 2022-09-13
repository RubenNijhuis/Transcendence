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

    findUninit(intraId: string) {
        return this.uninitRepo.findOne({ where: {intraId} })
    }

    createUninit(createUninitDto: CreateUninitDto) { // should this be async?
        if (!this.findUninit(createUninitDto.intraId))
          return ;
        const newUser = this.uninitRepo.create(createUninitDto);
        return this.uninitRepo.save(newUser);
      }
    
    removeUninit(intraId: string) {
        const ret = this.uninitRepo
            .createQueryBuilder('uninitialized')
            .delete()
            .from('Uninitialized')
            .where('intraId =:intraId', { intraId })
            .execute()
        return ret;
    }
}
