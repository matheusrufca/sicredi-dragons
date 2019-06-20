import { Component } from '@angular/core';

export interface TableItem<T> {
  selected: boolean;
  data: T;
}
