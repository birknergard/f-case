/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DietService {
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getDiets(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Diet/diets',
        });
    }
    /**
     * @returns string OK
     * @throws ApiError
     */
    public static getAllergies(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Diet/allergies',
        });
    }
}
