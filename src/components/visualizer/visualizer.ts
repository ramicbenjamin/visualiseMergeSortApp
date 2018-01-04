import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { select } from 'd3-selection';
import MergeSort from '../../app/mergeSort';

@Component({
  selector: 'visualizer',
  templateUrl: 'visualizer.html'
})
export class VisualizerComponent implements OnInit {

  @ViewChild('svg') svg: ElementRef;

  duration: number = 200;

  width: number;
  height: number;
  svgPlot: any;

  items: any;
  steps: any;
  xScale: any;
  rects: any;

  constructor() {
    console.log(window);
  }

  ngOnInit() {
    this.width = this.svg.nativeElement.clientWidth;
    this.height = this.svg.nativeElement.clientHeight;
    this.svgPlot = select(this.svg.nativeElement);
  }

  animate(items: any) {
    this.items = items;

    this.steps = MergeSort.computeSteps(items);

    this.xScale = d3.scaleLinear()
      .domain([0, this.items.length])
      .range([0, this.width]);

    this.draw();
  }

  draw() {
    this.clear();

    this.drawRects();

    this.animateMove(0);
  }

  clear() {
    this.svgPlot.selectAll('*').remove();
  }

  drawRects() {
    let yScale = d3.scaleLinear()
      .domain([0, Math.max(...this.items)])
      .range([5, this.height]);

    let barWidth = this.width / this.items.length;

    this.rects = this.svgPlot.append('g')
      .attr('transform', `translate(${ barWidth }, 2)`)
      .selectAll('rect')
      .data(this.items)
      .enter()
      .append('rect');

    this.rects.attr('id', (d) => `rect${ d }`)
      .attr('transform', (d, i) => `translate(${ this.xScale(i) - barWidth }, 0)`)
      .attr('width', barWidth * .9)
      .attr('height', (d) => yScale(d));
  }

  animateMove(i) {
    let oldStep = this.steps[i],
      newStep = this.steps[i + 1],
      sorted = [];

    this.animateStep(oldStep, newStep, sorted, 0, i);
  }

  animateStep(oldStep, newStep, sorted, i, j) {
    d3.selectAll('rect').attr('class', '');

    d3.select(`#rect${ newStep[i] }`).attr('class', 'testing');

    sorted.push(newStep[i]);
    oldStep.shift();

    this.rects.transition().duration(this.duration)
      .attr('transform', d => {
        let x = sorted.indexOf(d) > -1 ? sorted.indexOf(d) : oldStep.indexOf(d) + sorted.length;

        return 'translate(' + this.xScale(x - 1) + ',0)';
      });

    let that = this;

    d3.timeout(function() {
      if (oldStep.length > 0) {
        that.animateStep(oldStep, newStep, sorted, ++i, j);
      } else if (that.steps[j + 2]) {
        that.animateMove(++j);
      } else {
        that.rects.classed('testing', false);
      }
    }, this.duration);
  }
}
