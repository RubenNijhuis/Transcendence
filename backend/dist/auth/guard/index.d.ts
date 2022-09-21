import { ExecutionContext } from '@nestjs/common';
declare const FortyTwoAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class FortyTwoAuthGuard extends FortyTwoAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<any>;
}
export {};
