import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent {
  routePath: string = '';
  constructor(private activatedRoute:ActivatedRoute){

  }
  ngOnInit() {
    const routeSnapshot = this.activatedRoute.snapshot;
    this.routePath = routeSnapshot.url[0].path;


  }
}
