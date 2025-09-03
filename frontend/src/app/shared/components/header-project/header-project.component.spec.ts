import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProjectComponent } from './header-project.component';

describe('HeaderProjectComponent', () => {
  let component: HeaderProjectComponent;
  let fixture: ComponentFixture<HeaderProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
