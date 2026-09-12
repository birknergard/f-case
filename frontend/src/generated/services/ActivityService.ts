/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivityDto } from '../models/ActivityDto';
import type { IFormFile } from '../models/IFormFile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActivityService {
    /**
     * @param eventId
     * @returns ActivityDto OK
     * @throws ApiError
     */
    public static getActivities(
        eventId: string,
    ): CancelablePromise<Array<ActivityDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Activity/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * @param activityId
     * @returns ActivityDto OK
     * @throws ApiError
     */
    public static getActivity(
        activityId: string,
    ): CancelablePromise<ActivityDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Activity/id/{activityId}',
            path: {
                'activityId': activityId,
            },
        });
    }
    /**
     * @param formData
     * @returns ActivityDto OK
     * @throws ApiError
     */
    public static postActivity(
        formData: {
            ActivityJson?: string;
            ImageFiles?: Array<IFormFile>;
        },
    ): CancelablePromise<ActivityDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Activity',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }
    /**
     * @param formData
     * @returns ActivityDto OK
     * @throws ApiError
     */
    public static putActivity(
        formData: {
            ActivityJson?: string;
            ImageFiles?: Array<IFormFile>;
        },
    ): CancelablePromise<ActivityDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Activity',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }
    /**
     * @param activityId
     * @param imageId
     * @returns string OK
     * @throws ApiError
     */
    public static deleteActivityImage(
        activityId: string,
        imageId: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Activity/image/{activityId}/{imageId}',
            path: {
                'activityId': activityId,
                'imageId': imageId,
            },
        });
    }
    /**
     * @param activityId
     * @returns string OK
     * @throws ApiError
     */
    public static deleteActivity(
        activityId: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Activity/{activityId}',
            path: {
                'activityId': activityId,
            },
        });
    }
}
