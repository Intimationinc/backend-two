import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicChatComponent } from './public-chat.component';

describe('PublicChatComponent', () => {
  let component: PublicChatComponent;
  let fixture: ComponentFixture<PublicChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
