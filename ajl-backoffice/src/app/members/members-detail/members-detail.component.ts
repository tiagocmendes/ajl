import { Component } from '@angular/core'
import { MembersListService } from '../members-list/members-list.service'
import { Params, ActivatedRoute, Router } from '@angular/router'
import { Member } from '../models/member'

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.css',
  providers: [MembersListService],
})
export class MembersDetailComponent {
  member?: Member
  constructor(
    private membersListService: MembersListService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.member = this.membersListService.getMemberByNumber(
        +params['memberNo']
      )
    })

    if (!this.member) {
      this.router.navigate(['/members'])
    }
  }
}
