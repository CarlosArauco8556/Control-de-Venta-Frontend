import { Component, inject } from '@angular/core';
import { SupplyService } from '../../services/supply.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { ChangePageButtonsComponent } from '../../components/change-page-buttons/change-page-buttons.component';
import { DropdownButtonComponent } from '../../components/dropdown-button/dropdown-button.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { GetSupplies } from '../../interfaces/getSupplies';
import { QueryParams } from '../../interfaces/queryParams';

@Component({
  selector: 'supplies-get-supplies',
  imports: [HttpClientModule, CommonModule, CardComponent, ChangePageButtonsComponent, DropdownButtonComponent, SearchBarComponent],
  providers: [SupplyService],
  templateUrl: './get-supplies.component.html',
  styleUrl: './get-supplies.component.css'
})
export class GetSuppliesComponent {
  supplyService: SupplyService = inject(SupplyService);
  supplies: GetSupplies[] = [];
  queryParams: QueryParams = {textFilter: '', orderBy: '', IsDescending: null, pageNumber: 1, pageSize: 10};

  ngOnInit() {
    this.getSupplies();
  }

  async getSupplies() {
    try {
      this.supplies = await this.supplyService.getAllSupplies(this.queryParams);
      console.log('Supplies obtained: ', this.supplies);
    } catch (error) {
      console.error(error);
    }
  }

  parsedDate(date: any): string {
    const validDate = new Date(date);
    const year = validDate.getFullYear();
    const month = String(validDate.getMonth() + 1).padStart(2, '0');
    const day = String(validDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
}
