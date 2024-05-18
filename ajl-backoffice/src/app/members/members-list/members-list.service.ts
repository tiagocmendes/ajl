import { EventEmitter, Injectable } from '@angular/core'
import { Member } from '../models/member'
import { members } from '../constants/members'

@Injectable()
export class MembersListService {
  members: Member[] = members.slice()
  paymentStatusFilter: string = 'all'
  statusFilter: string = 'all'
  updateMembers = new EventEmitter<Member[]>()

  getMembersList(): Member[] {
    let filteredMembers = members.slice()

    if (this.paymentStatusFilter !== 'all') {
      filteredMembers = filteredMembers.filter(
        (member) => member.paymentStatus === this.paymentStatusFilter
      )
    }

    if (this.statusFilter !== 'all') {
      filteredMembers = filteredMembers.filter(
        (member) => member.status === this.statusFilter
      )
    }

    return filteredMembers
  }

  memberIsActive(member: Member) {
    return member.status === 'active'
  }

  memberPaidSubscription(member: Member) {
    return member.paymentStatus === 'paid'
  }

  searchMembers(value: string) {
    const searchedMembers: Member[] = []
    const lowerCaseValue = value.toLowerCase()
    const members = this.getMembersList()
    for (const member of members) {
      if (
        member.name.toLowerCase().includes(lowerCaseValue) ||
        member.email?.toLowerCase().includes(lowerCaseValue) ||
        member.phoneNo === lowerCaseValue ||
        member.memberNo === parseInt(lowerCaseValue)
      ) {
        searchedMembers.push(member)
      }
    }
    return searchedMembers
  }

  setPaymentStatusFilter(value: string) {
    this.paymentStatusFilter = value
    this.members = this.getMembersList()
    this.updateMembers.emit(this.members)
  }

  setStatusFilter(value: string) {
    this.statusFilter = value
    this.members = this.getMembersList()
    this.updateMembers.emit(this.members)
  }

  getMemberByNumber(memberNo: number) {
    return members.find((member) => member.memberNo === memberNo)
  }
}
