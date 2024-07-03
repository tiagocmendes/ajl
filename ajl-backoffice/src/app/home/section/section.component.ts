import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css',
})
export class SectionComponent {
  @Input() name: string = 'SectionName'
  @Input() icon: string = ''

  constructor(private router: Router) {}

  onClickSection() {
    this.router.navigate(['/' + this.name])
  }
}
