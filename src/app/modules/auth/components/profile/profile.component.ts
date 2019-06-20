import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'edit-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;


  constructor(private readonly auth: AuthService, private readonly userAuth: UserAuthService) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((user: User) => this.setUser(user));
  }

  getProfilePicture(): Observable<string> {
    return this.auth.getProfilePicture();
  }

  private setUser(user: User): void {
    this.user = user || null;
  }
}
