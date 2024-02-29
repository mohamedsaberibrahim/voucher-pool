import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Voucher Pool APIs')
    .setDescription('The voucher pool endpoints specification.')
    .setVersion('1.0')
    .addTag('Customer', 'Customer CRUD endpoints')
    .addTag('Special Offer', 'Special Offer CRUD endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();
