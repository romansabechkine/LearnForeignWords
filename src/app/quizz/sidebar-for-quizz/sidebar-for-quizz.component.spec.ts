import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarForQuizzComponent } from './sidebar-for-quizz.component';

describe('SidebarForQuizzComponent', () => {
  let component: SidebarForQuizzComponent;
  let fixture: ComponentFixture<SidebarForQuizzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarForQuizzComponent]
    });
    fixture = TestBed.createComponent(SidebarForQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
