// typeorm sql injection library
import { InjectRepository } from "@nestjs/typeorm";

// user entity
import { User } from "src/entities";

// typeorm repository manipulation
import { Repository } from "typeorm";

// dtos
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Member } from "../utils/RoomManager/types";

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

  findAnotherPlayer = (
    player: Member.Instance,
    opponents: Member.Instance[],
    evaluation: (
      player: Member.Instance,
      potentialOpponent: Member.Instance
    ) => boolean
  ): Member.Instance | null => {
    const selectedOpponent = null;

    // Remove the player from the list if it is there
    opponents = opponents.filter((member) => member.uid !== player.uid);

    // Go through all opponents
    for (const potentialOpponent of opponents) {
      // Check if the opponent is valid
      const isValidOpponent = evaluation(player, potentialOpponent);

      // If so we return it
      if (isValidOpponent) {
        return potentialOpponent;
      }
    }

    // Return the default one if no valid one was found
    return selectedOpponent;
  };
}
