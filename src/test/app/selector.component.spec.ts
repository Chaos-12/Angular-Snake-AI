import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorComponent } from 'src/main/app';
import { TestUtils } from 'src/test/testUtils';

describe(TestUtils.title('SelectorComponent'), () => {
  let component: SelectorComponent;
  let fixture: ComponentFixture<SelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
