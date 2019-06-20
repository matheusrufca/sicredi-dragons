import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(private readonly auth: AuthService, private readonly userAuth: UserAuthService) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((user: User) => this.setUser(user));
  }

  async logout(): Promise<void> {
    try {
      await this.userAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

  getProfilePicture(): Observable<string> {
    return this.auth.getProfilePicture();
  }

  private setUser(user: User): void {
    this.user = user || null;
  }
}
