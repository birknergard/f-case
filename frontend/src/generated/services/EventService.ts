/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventDto } from '../models/EventDto';
import type { IFormFile } from '../models/IFormFile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventService {
    /**
     * @returns EventDto OK
     * @throws ApiError
     */
    public static getEvents(): CancelablePromise<Array<EventDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Event',
        });
    }
    /**
     * @param formData
     * @returns EventDto OK
     * @throws ApiError
     */
    public static postEvent(
        formData: {
            EventJson?: string;
            ImageFile?: IFormFile;
        },
    ): CancelablePromise<EventDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Event',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }
    /**
     * @param formData
     * @returns EventDto OK
     * @throws ApiError
     */
    public static putEvent(
        formData: {
            EventJson?: string;
            ImageFile?: IFormFile;
        },
    ): CancelablePromise<EventDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Event',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }
    /**
     * @param id
     * @returns EventDto OK
     * @throws ApiError
     */
    public static getEvent(
        id: string,
    ): CancelablePromise<EventDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Event/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns string OK
     * @throws ApiError
     */
    public static deleteEvent(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Event/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns EventDto OK
     * @throws ApiError
     */
    public static getActiveEvents(): CancelablePromise<Array<EventDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Event/active',
        });
    }
    /**
     * @param eventId
     * @returns EventDto OK
     * @throws ApiError
     */
    public static publishEvent(
        eventId: string,
    ): CancelablePromise<EventDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Event/activate/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * @param id
     * @returns string OK
     * @throws ApiError
     */
    public static deleteEventImage(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Event/image/{id}',
            path: {
                'id': id,
            },
        });
    }
}
