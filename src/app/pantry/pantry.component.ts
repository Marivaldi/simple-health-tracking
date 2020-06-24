import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodItem } from 'src/types/food-item';
import { PantryService } from 'src/services/pantry.service';
import { FoodItemModalComponent } from '../food-item-modal/food-item-modal.component';
import { catchError, endWith } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.scss']
})
export class PantryComponent implements OnInit {
  @ViewChild(FoodItemModalComponent) foodItemModal;
  foodItems: FoodItem[] = [];

  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
    this.fetchFoodItems();
  }

  add() {
    this.foodItemModal.beginAdd();
  }

  edit(foodItem: FoodItem) {
    this.foodItemModal.beginEdit(foodItem);
  }

  addToPantry(foodItem: FoodItem) {
    this.foodItems.push(foodItem);
    this.saveCurrentFoodItems();
  }

  saveCurrentFoodItems() {
    this.pantryService.save(this.foodItems).pipe(
      catchError(this.handleError)
    );
    this.fetchFoodItems();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  private fetchFoodItems() {
    this.pantryService.load().subscribe((foodItems: FoodItem[]) => this.foodItems = foodItems);
  }

}
