import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import { TIMER } from 'src/configuration/config';
describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerComponent]
    });
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    component.timer = TIMER;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.stopTimer();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start and stop the timer', () => {
    component.startTimer();
    expect(component.timer).toBe(TIMER);
  });

  it('should reduce the timer', () => {
    component.timer = 10;
    component.reduceTimer(5);
    expect(component.timer).toBe(5);
  });

  it('should not reduce time below 0', () => {
    component.timer = 2;
    component.reduceTimer(5);
    expect(component.timer).toBe(0);
  });

  it('should emit timeout event', (done: DoneFn) => {
    component.timeOutEvent.subscribe(() => {
      expect(true).toBeTruthy(); 
      done();
    });

    component.timer = 1;
    component.startTimer();
  });

  it('should not emit timeout event if timer is not zero', (done: DoneFn) => {
    component.timeOutEvent.subscribe(() => {
      fail('Timeout event should not be emitted');
    });

    component.timer = 10;
    component.startTimer();
    done();
    setTimeout(() => {
      
    }, 1500);
  });
});
