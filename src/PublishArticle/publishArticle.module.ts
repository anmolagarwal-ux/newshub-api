import { Module } from '@nestjs/common';
import { PublishArticleController } from './publishArticle.controller';
import { DatabaseModule } from 'database/database.module';
import { PublishArticleService } from './publishArticle.service';
import { PublishArticleRepository } from './publishArticle.repository';
@Module({

    imports: [
        DatabaseModule
    ],

    controllers: [
        PublishArticleController
    ],

    providers: [
        PublishArticleService,
        PublishArticleRepository
    ],

    exports: [
        PublishArticleService
    ]

})
export class PublishArticleModule {}