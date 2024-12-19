import { Component, inject } from '@angular/core';
import { GetSuppliesComponent } from '../../pages/get-supplies/get-supplies.component';

@Component({
  selector: 'supplies-change-page-buttons',
  imports: [],
  templateUrl: './change-page-buttons.component.html',
  styleUrl: './change-page-buttons.component.css'
})
export class ChangePageButtonsComponent {
  getSuppliesComponent: GetSuppliesComponent = inject(GetSuppliesComponent);
  public currentPage: number = 1;

  nextPage()
  {
    if(this.getSuppliesComponent.supplies.length == 10)
    {
      this.currentPage++;
      this.getSuppliesComponent.queryParams.pageNumber = this.currentPage;
      this.getSuppliesComponent.getSupplies();
    }
  }
  

  previousPage()
  { 
  if(this.currentPage > 1)
  {
    this.currentPage--;
    this.getSuppliesComponent.queryParams.pageNumber = this.currentPage;
    this.getSuppliesComponent.getSupplies();
  }
  }
}
