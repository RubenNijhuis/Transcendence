import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Record from "src/entities/records/record.entity";
import { Repository } from "typeorm";


@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>
  ) {}

  getAllRecords() {
    return this.recordRepository.find();
  }

}