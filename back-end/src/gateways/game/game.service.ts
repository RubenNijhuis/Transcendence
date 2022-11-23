// typeorm sql injection library
import { InjectRepository } from "@nestjs/typeorm";

// user entity
import { User } from "src/entities";

// typeorm repository manipulation
import { Repository } from "typeorm";

// dtos
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

/**
 *
 */
@Injectable()
export class GameService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  async initializeGame(): Promise<boolean> {
    try {
      return Promise.resolve(true);
    } catch (err) {
      return Promise.resolve(false);
    }
  }

  async updateGameResults(): Promise<boolean> {
    try {
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(false);
    }
  }
}
