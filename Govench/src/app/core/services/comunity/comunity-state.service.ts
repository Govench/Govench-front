import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommunityStateService {
  private joinedCommunitiesSubject = new BehaviorSubject<{[key: string]: {[key: number]: boolean}}>({});
  joinedCommunities$ = this.joinedCommunitiesSubject.asObservable();

  constructor(private authService: AuthServiceService) {
    this.loadJoinedCommunitiesState();
  }

  setJoinedState(communityId: number, joined: boolean) {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    const currentState = this.joinedCommunitiesSubject.value;
    const userState = currentState[userId] || {};
    this.joinedCommunitiesSubject.next({
      ...currentState,
      [userId]: { ...userState, [communityId]: joined }
    });
    this.saveJoinedCommunitiesState();
  }

  isJoined(communityId: number): boolean {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return false;

    const userState = this.joinedCommunitiesSubject.value[userId];
    return userState ? userState[communityId] || false : false;
  }

  public loadJoinedCommunitiesState() {
    const storedState = localStorage.getItem('joinedCommunities');
    if (storedState) {
      this.joinedCommunitiesSubject.next(JSON.parse(storedState));
    }
  }

  private saveJoinedCommunitiesState() {
    localStorage.setItem('joinedCommunities', JSON.stringify(this.joinedCommunitiesSubject.value));
  }

  clearUserState() {
    const currentState = this.joinedCommunitiesSubject.value;
    const userId = this.authService.getCurrentUserId();
    if (userId && currentState[userId]) {
      const newState = { ...currentState };
      delete newState[userId];
      this.joinedCommunitiesSubject.next(newState);
      this.saveJoinedCommunitiesState();
    }
  }
}