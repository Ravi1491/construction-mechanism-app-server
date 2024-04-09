
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

export interface UpdateUserInput {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

export interface IQuery {
    getAllUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
    getUserById(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export type JSON = any;
type Nullable<T> = T | null;
