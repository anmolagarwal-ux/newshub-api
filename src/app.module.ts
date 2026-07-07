import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { LoginModule } from './Login/login.module';
import { ContactUsModule } from './ContactUs/contactUs.module';
import { CategoryModule } from './Category/category.module';
import { RoleModule } from './Role/role.module';
import { UserModule } from './User/user.module';
import { DashboardModule } from './Dashboard/dashboard.module';
import { StatusModule } from './Status/status.module';
import { PublishArticleModule } from './PublishArticle/publishArticle.module';
import { ArticleModule } from './Article/article.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import path from 'path';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AllExceptionFilter } from './decorator/all-exception.filter';
import { DatabaseModule } from '../database/database.module';

@Module({
  
  imports: [
    DatabaseModule ,
    AuthModule ,
    LoginModule ,
    ContactUsModule , 
    CategoryModule ,
    RoleModule,
    UserModule,
    DashboardModule,
    StatusModule,
    PublishArticleModule,
    ArticleModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.resolve(__dirname, '../../i18n'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [ ],
  providers: [{
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },{
    provide: APP_FILTER,
    useClass: AllExceptionFilter,
  },],
})
export class AppModule {}