import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent  {
  items = [];

  constructor() { }

  addItem(newItem : String){
    if (newItem) {
      this.items.push(newItem);
    }
  }
  removeItem(item:string)
  {
     if(item != 'undefined'){
      const index = this.items.indexOf(item);
      console.log('index = ' +index)
      if (index !== -1) {
        this.items.splice(index,1)
      }
     }
   }

}
