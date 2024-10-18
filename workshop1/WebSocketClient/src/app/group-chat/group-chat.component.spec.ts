import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatComponent } from './group-chat.component';

describe('GroupChatComponent', () => {
  let component: GroupChatComponent;
  let fixture: ComponentFixture<GroupChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
