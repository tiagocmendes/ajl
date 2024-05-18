import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HomeComponent } from './home.component'
import { SectionComponent } from './section/section.component'
import { TranslateModule } from '@ngx-translate/core'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [HomeComponent, SectionComponent],
  imports: [BrowserModule, TranslateModule, RouterModule],
  exports: [HomeComponent],
})
export class HomeModule {}
