/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FacilityDto } from '../models/FacilityDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FacilityControllerService {
    /**
     * @returns FacilityDto OK
     * @throws ApiError
     */
    public static getAll(): CancelablePromise<Array<FacilityDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/facility',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns FacilityDto OK
     * @throws ApiError
     */
    public static put(
        requestBody: FacilityDto,
    ): CancelablePromise<FacilityDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/facility',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns FacilityDto OK
     * @throws ApiError
     */
    public static post(
        requestBody: FacilityDto,
    ): CancelablePromise<FacilityDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/facility',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param facilityId
     * @returns FacilityDto OK
     * @throws ApiError
     */
    public static get(
        facilityId: string,
    ): CancelablePromise<FacilityDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/facility/{facilityId}',
            path: {
                'facilityId': facilityId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param facilityId
     * @returns string OK
     * @throws ApiError
     */
    public static delete(
        facilityId: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/facility/{facilityId}',
            path: {
                'facilityId': facilityId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
