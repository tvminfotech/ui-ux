import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSucessComponent } from './sign-up-sucess.component';

describe('SignUpSucessComponent', () => {
  let component: SignUpSucessComponent;
  let fixture: ComponentFixture<SignUpSucessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpSucessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
