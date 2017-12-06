import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrayForSort = " ";
  arraySorted = false;
  sortedArray: any;
  constructor(public navCtrl: NavController) {

  }

  mergeSort (arr) {
    if (arr.length === 1) {
      // return once we hit an array with a single item
      return arr
    }
  
    const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
    const left = arr.slice(0, middle) // items on the left side
    const right = arr.slice(middle) // items on the right side
  
    return this.merge(
      this.mergeSort(left),
      this.mergeSort(right)
    )
  }

  merge (left, right) {
    let result = []
    let indexLeft = 0
    let indexRight = 0
  
    while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft] < right[indexRight]) {
        result.push(left[indexLeft])
        indexLeft++
      } else {
        result.push(right[indexRight])
        indexRight++
      }
    }
  
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
  }
  sortArray(){
    this.arraySorted = false;
    let prepareArrayForSorting = this.arrayForSort.split("");
    this.sortedArray = this.mergeSort(prepareArrayForSorting);
    this.arraySorted = true;
  }

}
