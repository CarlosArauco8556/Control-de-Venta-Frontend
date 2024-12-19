import { Component, inject } from '@angular/core';
import { GetSuppliesComponent } from '../../pages/get-supplies/get-supplies.component';

@Component({
  selector: 'supplies-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  getSuppliesComponent: GetSuppliesComponent = inject(GetSuppliesComponent);

  filterProducts(searchImput: string)
  {
    this.getSuppliesComponent.queryParams.textFilter = searchImput;
    this.getSuppliesComponent.getSupplies();
  }

  resetFilter()
  {
    console.log("Resetting filter");
    this.getSuppliesComponent.queryParams.textFilter = "";
    this.getSuppliesComponent.getSupplies();
  }
}
