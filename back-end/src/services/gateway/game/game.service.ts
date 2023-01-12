import { Injectable } from "@nestjs/common";

@Injectable()
export class GameSocketService {
  testService(testString: string): string {
    return testString;
  }
}
