import { Injectable } from '@angular/core'
import { Section } from './models/Section'

@Injectable()
export class HomeService {
  sections: Section[] = [{ name: 'members', icon: '' }]

  getHomeSections() {
    return this.sections
  }
}
