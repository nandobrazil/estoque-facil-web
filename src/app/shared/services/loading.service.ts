import { Injectable } from '@angular/core';
import { Subject, Observable, asyncScheduler } from 'rxjs';
import { delay, distinctUntilChanged, throttleTime } from 'rxjs/operators';

export interface ILoading {
    isLoading: boolean;
    message: string;
}

@Injectable({ providedIn: 'root' })
export class LoadingService {

  private loadingSubject: Subject<boolean> = new Subject<boolean>();
  private forceNavigation: boolean = false;

  next(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }

  get(): Observable<boolean> {
    return this.loadingSubject.pipe(
      throttleTime(0, asyncScheduler, { leading: false, trailing: true }),
      distinctUntilChanged((x, y) => x === y),
      delay(0));
  }

  setForceNavigation(forceNavigation: boolean) {
    this.forceNavigation = forceNavigation;
  }

  getForceNavigation(): boolean {
    return this.forceNavigation;
  }
}
