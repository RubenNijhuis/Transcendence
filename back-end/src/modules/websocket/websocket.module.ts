import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [FriendlistController],
  providers: [FriendlistService],
  exports: [FriendlistService]
})
export class FriendlistModule {}
