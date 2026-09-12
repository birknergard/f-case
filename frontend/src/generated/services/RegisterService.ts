/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventRegistrationDto } from '../models/EventRegistrationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RegisterService {
    /**
     * @param eventId
     * @returns EventRegistrationDto OK
     * @throws ApiError
     */
    public static getEventRegistrations(
        eventId: string,
    ): CancelablePromise<Array<EventRegistrationDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Register/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns EventRegistrationDto OK
     * @throws ApiError
     */
    public static postEventRegistration(
        requestBody: EventRegistrationDto,
    ): CancelablePromise<EventRegistrationDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns EventRegistrationDto OK
     * @throws ApiError
     */
    public static putEventRegistration(
        requestBody: EventRegistrationDto,
    ): CancelablePromise<EventRegistrationDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @param eventId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteEventRegistration(
        userId: string,
        eventId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Register/{userId}/event/{eventId}',
            path: {
                'userId': userId,
                'eventId': eventId,
            },
        });
    }
}
