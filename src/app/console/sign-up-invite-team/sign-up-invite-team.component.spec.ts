import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpInviteTeamComponent } from './sign-up-invite-team.component';

describe('SignUpInviteTeamComponent', () => {
  let component: SignUpInviteTeamComponent;
  let fixture: ComponentFixture<SignUpInviteTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpInviteTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpInviteTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
