// User combined from clerk and db
export interface IUserData {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
    phone: string | undefined;
}

export interface IUserDb {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
    phone: string | undefined;
}