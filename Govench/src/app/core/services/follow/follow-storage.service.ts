import { Injectable, inject } from '@angular/core';
import { AuthServiceService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowStorage {
  private readonly FOLLOWING_KEY = 'following_users';

  private authService = inject(AuthServiceService);

  private getCurrentUserKey(): string {
    const currentUser = this.authService.getUser();
    return currentUser ? `${this.FOLLOWING_KEY}${currentUser.id}` : '';
  }

  getFollowingUsers(): number[] {
    const key = this.getCurrentUserKey();
    if (!key) return [];
    const followingString = localStorage.getItem(key);
    return followingString ? JSON.parse(followingString) : [];
  }

  setFollowingUsers(followingUsers: number[]): void {
    const key = this.getCurrentUserKey();
    if (key) {
      localStorage.setItem(key, JSON.stringify(followingUsers));
    }
  }

  addFollowingUser(userId: number): void {
    const followingUsers = this.getFollowingUsers();
    if (!followingUsers.includes(userId)) {
      followingUsers.push(userId);
      this.setFollowingUsers(followingUsers);
    }
  }

  removeFollowingUser(userId: number): void {
    const followingUsers = this.getFollowingUsers();
    const index = followingUsers.indexOf(userId);
    if (index > -1) {
      followingUsers.splice(index, 1);
      this.setFollowingUsers(followingUsers);
    }
  }

  isFollowing(userId: number): boolean {
    return this.getFollowingUsers().includes(userId);
  }
}