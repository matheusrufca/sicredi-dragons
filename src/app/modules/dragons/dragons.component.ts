import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dragons',
  template: '<div class="py-3"><router-outlet></router-outlet></div>',
  styleUrls: [],
})
export class DragonsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
