import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MembersComponent } from './members.component'
import { TranslateModule } from '@ngx-translate/core'
import { RouterModule } from '@angular/router'
import { MembersListComponent } from './members-list/members-list.component'
import { MembersDetailComponent } from './members-detail/members-detail.component'

@NgModule({
  declarations: [
    MembersComponent,
    MembersListComponent,
    MembersDetailComponent,
  ],
  imports: [BrowserModule, TranslateModule, RouterModule],
  exports: [MembersComponent],
})
export class MembersModule {}
