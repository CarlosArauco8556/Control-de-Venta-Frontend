import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInvoicesComponent } from './get-invoices.component';

describe('GetInvoicesComponent', () => {
  let component: GetInvoicesComponent;
  let fixture: ComponentFixture<GetInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});