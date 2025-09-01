import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinMeComponent } from './join-me.component';

describe('JoinMeComponent', () => {
  let component: JoinMeComponent;
  let fixture: ComponentFixture<JoinMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinMeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
