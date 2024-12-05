import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfumefavPage } from './perfumefav.page';

describe('PerfumefavPage', () => {
  let component: PerfumefavPage;
  let fixture: ComponentFixture<PerfumefavPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfumefavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
