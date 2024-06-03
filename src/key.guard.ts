import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!process.env.API_KEYS) {
      throw new Error("No API keys in .env found");
    }

    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers["x-api-key"]; // give the name you want

    if (!apiKey) {
      throw new UnauthorizedException("API key is missing.");
    }

    const apiKeys = process.env.API_KEYS.split(", ");

    // call your env. var the name you want
    if (!apiKeys.includes(apiKey)) {
      throw new UnauthorizedException("Invalid API key.");
    }

    return true;
  }
}
