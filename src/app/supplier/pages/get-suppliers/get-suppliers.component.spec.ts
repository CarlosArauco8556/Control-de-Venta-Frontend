import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSuppliersComponent } from './get-suppliers.component';

describe('GetSuppliersComponent', () => {
  let component: GetSuppliersComponent;
  let fixture: ComponentFixture<GetSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSuppliersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
