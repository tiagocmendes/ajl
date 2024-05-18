import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HomeService } from './home.service';
import { Section } from './models/Section';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [TranslateService, HomeService]
})
export class HomeComponent implements OnInit {
  userName: string = 'Tiago'
  sections: Section[] = [];

  constructor(private homeService: HomeService) {
  }

  ngOnInit() {
    this.sections = this.homeService.getHomeSections();
  }

}
