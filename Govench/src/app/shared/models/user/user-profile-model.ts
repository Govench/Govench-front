export interface UserProfile{
    id:number;
    email:string;
    role: 'ROLE_ORGANIZER' | 'ROLE_PARTICIPANT' | 'ROLE_ADMIN' | null
    name : string;
    lastname:string;
    seguidores:number;
    seguidos:number;
    profileDesc : string;
    birthday:string;
    gender:string;
    interest:string[];
    skills:string[];
    socialLinks:string[];
    eventosCreados?:number;
    tipoUsuario:string;

}