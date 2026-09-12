/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormDto } from '../models/FormDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FormService {
    /**
     * @param id
     * @returns FormDto OK
     * @throws ApiError
     */
    public static getForm(
        id: string,
    ): CancelablePromise<FormDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Form/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteForm(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/Form/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param requestBody
     * @returns FormDto OK
     * @throws ApiError
     */
    public static putForm(
        requestBody: FormDto,
    ): CancelablePromise<FormDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/Form',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
