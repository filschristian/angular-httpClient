import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
      next: data => {
        this.products = data;
        console.log(this.products);
      },
      error: err => this.toastrService.error(err, '', { positionClass: 'toast-top-center' })
    });

  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

}
