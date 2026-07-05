import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../Database/database.module';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        ArticleController,
    ],
    providers: [
        ArticleService,
        ArticleRepository,
    ],
    exports: [
        ArticleService,
        ArticleRepository,
    ],
})
export class ArticleModule { }