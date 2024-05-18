import { Component, OnInit } from '@angular/core'
import { MembersListService } from './members-list.service'
import { Member } from '../models/member'
import { Router } from '@angular/router'

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.css',
  providers: [MembersListService],
})
export class MembersListComponent implements OnInit {
  members: Member[] = []

  constructor(
    public membersListService: MembersListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.members = this.membersListService.getMembersList()
    this.membersListService.updateMembers.subscribe((members) => {
      this.members = members
    })
  }

  searchMembers(event: Event) {
    const value = (event.target as HTMLInputElement).value
    if (!value) {
      this.members = this.membersListService.getMembersList()
      return
    }
    const searchedMembers = this.membersListService.searchMembers(value)
    this.members = searchedMembers
  }

  changePaymentStatusFilter(event: Event) {
    this.membersListService.setPaymentStatusFilter(
      (event.target as HTMLSelectElement).value
    )
  }

  changeStatusFilter(event: Event) {
    this.membersListService.setStatusFilter(
      (event.target as HTMLSelectElement).value
    )
  }

  onClickMember(member: Member) {
    this.router.navigate(['/members', member.memberNo])
  }
}
