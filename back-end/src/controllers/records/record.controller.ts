import {
	Body,
	Controller,
	UsePipes,
	ValidationPipe,
	Delete,
	Get,
	Query,
	Param,
	Post,
	Put
  } from "@nestjs/common";

import { RecordService } from "src/services/records/record.service";
import Record from "src/entities/records/record.entity";


@Controller("record")
export class RecordController {
	constructor(private readonly recordService: RecordService) {}

	@Get()
	getAllRecords() {
	  return this.recordService.getAllRecords();
	}
}
