import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectorComponent } from 'src/main/components/modes';
import { TestUtils } from 'src/test/testUtils';

TestUtils.testClass('SelectorComponent', function(){
  let component: SelectorComponent;
  let fixture: ComponentFixture<SelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorComponent ]
    })
    .compileComponents();
  })

  beforeEach(function(){
    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('Should create component', () => {
    expect(component).toBeTruthy();
  })
})
