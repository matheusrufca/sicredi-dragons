import { DragonsModule } from './dragons.module';

describe('DragonsModule', () => {
  let dragonsModule: DragonsModule;

  beforeEach(() => {
    dragonsModule = new DragonsModule();
  });

  it('should create an instance', () => {
    expect(dragonsModule).toBeTruthy();
  });
});
