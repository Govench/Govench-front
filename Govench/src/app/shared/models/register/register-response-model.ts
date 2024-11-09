export interface RegisterResponse{
    id: number;
    name: string;
    email: string;
    password: string;
    birthday: string;
    gender: string;
    profileDesc: string;
    interest: string[];
    skills: string[];
    socialLinks: string[];
    followers: string[];
    followings: string[];
}