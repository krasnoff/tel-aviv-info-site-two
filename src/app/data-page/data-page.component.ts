import { Component, OnInit, ViewChild } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, NavigationEnd, Event  } from '@angular/router';
import {AppService} from '../app.service';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/of';



@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {

  private dataType: string; 
  private sub: any;
  private res: any;
  public param: string;

  @ViewChild('table')table: any;

  displayedColumns = [];
  dataSource = new ExampleDataSource([]);

  constructor(private router: Router, private route: ActivatedRoute, private _httpService:AppService) {
    
  }

  ngOnInit() {
    this.getParam();

    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .subscribe((event) => {
        console.log('NavigationEnd:', event);
        this.getParam();
    });
  }

  getParam() {
    this.sub = this.route.params.subscribe(params => {
      this.param = params['dataType'];
      this.getData(this.param); 
    });
  }

  getData(dataType: string)
  {
    this._httpService.getMethod('https://jsonplaceholder.typicode.com/' + dataType)
    .subscribe (
      data => {
        this.parseData(data);    
      }
    );
  }

  parseData(obj: any)
  {
    if (obj.length > 0)
    {
      this.displayedColumns = [];
      for (var property in obj[0]) {
        if (obj[0].hasOwnProperty(property)) {
          this.displayedColumns.push(property);
        }
      }

      this.table.dataSource = new ExampleDataSource(obj);
    }
    
  }
}

//#region external components

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  
  dataArr: any;
  
  constructor(private _data: any) {
    super();
    this.dataArr = _data;
  }

  

  

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return Observable.of(this.dataArr);
  }

  disconnect() {}
}

//#endregion