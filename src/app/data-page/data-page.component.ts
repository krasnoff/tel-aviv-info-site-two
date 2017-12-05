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
  public paramTitle: string;

  @ViewChild('table')table: any;

  displayedColumns = [];
  headerProperties = {};
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

      this.paramTitle = params['pageTitle'];
      this.getData(this.paramTitle); 
    });
  }

  getData(dataType: string)
  {
    this._httpService.getMethod('https://api.tel-aviv.gov.il/gis/Layer?layerCode=' + dataType)
    .subscribe (
      data => {
        this.parseData(data);    
      }
    );
  }

  parseData(obj: any)
  {
    if (obj.fields != undefined && obj.fields.length > 0)
    {
      this.displayedColumns = [];
      for (var property in obj.fields) {
        if (obj.fields.hasOwnProperty(property)) {
          this.displayedColumns.push(obj.fields[property].name);
        }
      }
      this.headerProperties = obj.fieldAliases;

      this.table.dataSource = new ExampleDataSource(obj.features);
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