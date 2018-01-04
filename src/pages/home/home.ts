import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VisualizerComponent } from '../../components/visualizer/visualizer';
import * as d3 from 'd3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Generator conf
  count:number = 15;

  @ViewChild(VisualizerComponent)
  visualizer: VisualizerComponent;

  input:string = '';
  animating: boolean = false;

  constructor(public navCtrl: NavController) { }

  randomize() {
    this.input = d3.shuffle(d3.range(0, this.count)).join(', ');
  }

  animate() {
    this.animating = true;

    let items = this.input.split(',').map(e => parseInt(e));

    this.visualizer.animate(items);

    this.animating = false;
  }
}
