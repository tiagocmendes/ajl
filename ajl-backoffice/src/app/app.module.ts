import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { UiModule } from './ui/ui.module'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HomeComponent } from './home/home.component'
import { MembersComponent } from './members/members.component'
import { MembersDetailComponent } from './members/members-detail/members-detail.component'
import { RouterModule, Routes } from '@angular/router'
import { HomeModule } from './home/home.module'
import { MembersModule } from './members/members.module'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

// Define your application routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MembersComponent },
  { path: 'members/:memberNo', component: MembersDetailComponent },
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    HomeModule,
    MembersModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
