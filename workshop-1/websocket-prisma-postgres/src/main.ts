import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // Use ExpressApplication for view engine support
import { join } from 'path';

async function bootstrap() {
  // Create an Express-based application
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set the view engine to EJS
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // Define the 'views' folder for templates
  app.setViewEngine('ejs'); // Set EJS as the view engine

  await app.listen(8000);
}
bootstrap();
