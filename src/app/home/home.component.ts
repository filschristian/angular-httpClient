import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products = [];
  dataSub: Subscription;

  constructor(private dataService: DataService, public toastrService: ToastrService) { }

  ngOnInit() {
     this.dataSub = this.dataService.sendGetRequest().subscribe({
      next: res => {
        this.products = res.body;
      },
      error: err => this.toastrService.error(err, '', { positionClass: 'toast-top-center' })
    });

  }

  public firstPage() {
    this.dataService.sendGetRequestToUrl(this.dataService.first).subscribe((res: HttpResponse<any>) => {
      this.products = res.body;
    })
  }

  public previousPage() {
    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.dataService.sendGetRequestToUrl(this.dataService.prev).subscribe((res: HttpResponse<any>) => {
        this.products = res.body;
      })
    }
  }
  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.dataService.sendGetRequestToUrl(this.dataService.next).subscribe((res: HttpResponse<any>) => {
        this.products = res.body;
      })
    }
  }
  public lastPage() {
    this.dataService.sendGetRequestToUrl(this.dataService.last).subscribe((res: HttpResponse<any>) => {
      this.products = res.body;
    })
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

}
