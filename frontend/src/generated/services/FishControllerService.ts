/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Fish } from '../models/Fish';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FishControllerService {
    /**
     * @returns Fish OK
     * @throws ApiError
     */
    public static getFishes(): CancelablePromise<Array<Fish>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fish',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
