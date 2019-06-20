import { EventEmitter, Output } from '@angular/core';

export abstract class SocialLoginButton {
  @Output() pressed = new EventEmitter<string>();
  protected readonly provider: string;

  onClick(): void {
    this.pressed.emit(this.provider);
  }
}
