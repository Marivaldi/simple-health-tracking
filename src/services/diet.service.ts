import { Injectable } from '@angular/core';
import { DietDay } from 'src/types/diet-day';
import { Macros } from 'src/types/macros';
import { TrackedFoodItem } from 'src/types/tracked-food-item';
import { AuthorizationService } from './authorization.service';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, switchMap, mergeMap, endWith } from 'rxjs/operators';
import { isArrayLike } from 'lodash';
import { ThingsIAte } from 'src/types/things-iate';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private readonly data_key: string = "super_fun_diet_stuff";
  private readonly health_tracking_url: string = "https://72mtzp9aq7.execute-api.us-east-1.amazonaws.com/dev/healthtracking";

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) { }

  save(dietDays: DietDay[]): Observable<DietDay[]> {
    const requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };
    return this.http.post<DietDay[]>(this.health_tracking_url, dietDays, requestOptions);
  }

  saveTrackedDays(trackedDays: DietDay[]): Observable<DietDay[]> {

    return this.load().pipe(
      mergeMap((allDays: DietDay[]) => {

        const sortedDays = allDays.slice().sort((a, b) => a._date.getTime() - b._date.getTime());
        const updatedDays = sortedDays.map((day) => {
          const indexOfTrackedDay = trackedDays.findIndex((trackedDay) => this.daysAreEqual(day, trackedDay));
          if (indexOfTrackedDay !== -1) {
            return Object.assign(new DietDay(), trackedDays[indexOfTrackedDay]);
          }

          return day;
        });
        return this.save(updatedDays).pipe(catchError(this.handleError))
      })
    )
  }

  load(): Observable<DietDay[]> {
    const requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };
    return this.http.get<DietDay[]>(this.health_tracking_url, requestOptions).pipe(map((value: DietDay[]) => this.convert(value)));
  }

  loadHistorical(): Observable<DietDay[]> {
    return this.load().pipe(
      map((allDays) => {
        const sortedDays = allDays.slice().sort((a, b) => a._date.getTime() - b._date.getTime());
        const indexOfToday: number = sortedDays.findIndex((day: DietDay) => this.isToday(day));
        const relevantDays = sortedDays.slice(0, indexOfToday);
        return this.convert(relevantDays);
      })
    );

  }

  loadForTracking(): Observable<DietDay[]> {
    return this.load().pipe(
      map((allDays) => {
        const sortedDays = allDays.slice().sort((a, b) => a._date.getTime() - b._date.getTime());
        const indexOfToday: number = sortedDays.findIndex((day: DietDay) => this.isToday(day));
        if (indexOfToday === -1) {
          const todayAndAWeekFromToday = this.seedDays();
          const updatedDays = sortedDays.concat(todayAndAWeekFromToday);
          this.save(updatedDays).pipe(catchError(this.handleError)).subscribe();
          return this.convert(todayAndAWeekFromToday);
        }

        const indexOfAWeekFromToday = indexOfToday + 7;
        let relevantDays = sortedDays.slice(indexOfToday, indexOfAWeekFromToday);
        if (relevantDays.length < 7) {
          const missingDays = this.seedDaysFromToday(relevantDays.length);
          const updatedDays = sortedDays.concat(missingDays);
          this.save(updatedDays).pipe(catchError(this.handleError)).subscribe();
          relevantDays = relevantDays.concat(missingDays);
        }

        return this.convert(relevantDays);
      })
    )

  }

  private seedDays(): DietDay[] {
    const seededDietDays: DietDay[] = [];
    const today = new Date();

    const dietToday: DietDay = new DietDay();
    dietToday._date = today;
    seededDietDays.push(dietToday);

    for (let i = 1; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const nextDietDay: DietDay = new DietDay();
      nextDietDay._date = nextDay;
      seededDietDays.push(nextDietDay);
    }


    return seededDietDays;
  }

  private seedDaysFromToday(start: number) {
    const seededDietDays: DietDay[] = [];
    const today = new Date();

    for (let i = start; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      const nextDietDay: DietDay = new DietDay();
      nextDietDay._date = nextDay;
      seededDietDays.push(nextDietDay);
    }

    return seededDietDays;
  }


  private convert(dietDays: DietDay[]) {
    return dietDays.map((day) => {
      const mappedDay = Object.assign(new DietDay(), day);
      mappedDay.macros = Object.assign(new Macros(), day.macros);
      mappedDay.goal = Object.assign(new Macros(), day.goal);
      mappedDay._date = new Date(day._date);
      if(Array.isArray(day.thingsIAte)) {
        delete mappedDay.thingsIAte;
        mappedDay.thingsIAte = new ThingsIAte();
        mappedDay.thingsIAte.forBreakfast = this.convertTrackedFoodItems(day.thingsIAte);
      } else {
        mappedDay.thingsIAte = Object.assign(new ThingsIAte(), day.thingsIAte);
        mappedDay.thingsIAte.forBreakfast = this.convertTrackedFoodItems(day.thingsIAte.forBreakfast);
        mappedDay.thingsIAte.asAMorningSnack = this.convertTrackedFoodItems(day.thingsIAte.asAMorningSnack);
        mappedDay.thingsIAte.forLunch = this.convertTrackedFoodItems(day.thingsIAte.forLunch);
        mappedDay.thingsIAte.asAnAfternoonSnack = this.convertTrackedFoodItems(day.thingsIAte.asAnAfternoonSnack);
        mappedDay.thingsIAte.forDinner = this.convertTrackedFoodItems(day.thingsIAte.forDinner);
        mappedDay.thingsIAte.forDessert = this.convertTrackedFoodItems(day.thingsIAte.forDessert);
      }
      return mappedDay;
    });
  }

  private convertTrackedFoodItems(trackedFoodItems: TrackedFoodItem[]) {
    if(!trackedFoodItems) return [];

    return trackedFoodItems.map((item) => {
      const mappedItem = Object.assign(new TrackedFoodItem(), item);
      mappedItem.macros = Object.assign(new Macros(), item.macros);
      return mappedItem;
    })
  }

  private isToday(day: DietDay) {
    const today = new Date();
    return day._date.getDate() == today.getDate() &&
      day._date.getMonth() == today.getMonth() &&
      day._date.getFullYear() == today.getFullYear()
  }

  private daysAreEqual(dayOne: DietDay, dayTwo: DietDay) {
    const areEqual = dayOne._date.getDate() == dayTwo._date.getDate() &&
      dayOne._date.getMonth() == dayTwo._date.getMonth() &&
      dayOne._date.getFullYear() == dayTwo._date.getFullYear();
    return areEqual;
  }

  private get headerDict() {
    return {
      'Content-Type': 'application/json',
      Authorization: this.authorizationService.getToken(),
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
