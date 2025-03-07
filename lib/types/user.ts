// User combined from clerk and db
export interface IUserClerk {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
    phone: string | undefined;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserDb {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
    phone: string | undefined;
    createdAt: Date;
    updatedAt: Date;
}