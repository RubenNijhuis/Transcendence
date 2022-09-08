import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard('42') {
	async canActivate(context: ExecutionContext): Promise<any> {
		console.log("entered guard");
		const activate = (await super.canActivate(context)) as boolean;
		console.log("activate: " + activate);
		const request = context.switchToHttp().getRequest();
		await super.logIn(request);
		return activate;
	}
}
