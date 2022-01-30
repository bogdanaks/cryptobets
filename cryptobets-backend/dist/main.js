"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./models/app/app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        skipMissingProperties: true,
        skipUndefinedProperties: true,
    }));
    app.enableCors({ credentials: true, origin: true });
    await app.listen(3008);
}
bootstrap();
//# sourceMappingURL=main.js.map