import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
  @Input() timer: number = 0;
  private intervalId: any;
  @Output() timeOutEvent = new EventEmitter<number>();

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.timer === 0) {
        this.stopTimer();
        this.timeOutEvent.emit();
      } else {
        this.timer--;
      }
    }, 1000); 
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  reduceTimer(penaltyTime: number) {
    if (this.timer >= penaltyTime) {
      this.timer -= penaltyTime;
    } else {
      this.timer = 0;
      this.stopTimer();
      this.timeOutEvent.emit();
    }
  }
}