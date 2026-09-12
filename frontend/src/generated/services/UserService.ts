/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventDto } from '../models/EventDto';
import type { UserDto } from '../models/UserDto';
import type { UserRegisterDto } from '../models/UserRegisterDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * @param id
     * @returns UserDto OK
     * @throws ApiError
     */
    public static getUser(
        id: string,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/User/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param userId
     * @returns EventDto OK
     * @throws ApiError
     */
    public static getRegisteredEvents(
        userId: string,
    ): CancelablePromise<Array<EventDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/User/registered/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns UserDto OK
     * @throws ApiError
     */
    public static postUser(
        requestBody: UserRegisterDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/User',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns UserDto OK
     * @throws ApiError
     */
    public static putUser(
        requestBody: UserDto,
    ): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/User',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns boolean OK
     * @throws ApiError
     */
    public static getUserPermissions(
        id: string,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/User/auth/{id}',
            path: {
                'id': id,
            },
        });
    }
}
