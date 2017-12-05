import { Component, ViewChild } from '@angular/core';
import {AppService} from './app.service';
import {Observable} from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  title = 'app';
  @ViewChild('sidenav')sidenav: any;

  constructor(private _httpService:AppService) {}
  public codes: Array<any> = [];
  private codesOriginal: Array<any> = [];
  
  ngOnInit() {
    this._httpService.getMethod('https://api.tel-aviv.gov.il/gis/LayersCodes')
    .subscribe (
      data => {
        data.forEach(element => {
          this.codes.push(element);
        });

        this.codes.sort(function(a, b) {
          if (a.name > b.name) { return 1; }
          if (a.name < b.name) { return -1; }
          return 0;
        });

        this.codesOriginal = this.codes;
      }
    );
  }

  search(val: any) {
    if (!val) this.codes = this.codesOriginal;
    this.codes = this.codesOriginal.filter(d => d.name.indexOf(val) >= 0);
  }

  showSideNav(val: string): void {
    if (this.sidenav.opened)
      this.sidenav.close();
    else
      this.sidenav.open();
  }

  chooseItem(val: any)
  {
    return false;
  }
}

