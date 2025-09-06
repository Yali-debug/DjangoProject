import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CentresInteretPage } from './centres-interet.page';

describe('CentresInteretPage', () => {
  let component: CentresInteretPage;
  let fixture: ComponentFixture<CentresInteretPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CentresInteretPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
