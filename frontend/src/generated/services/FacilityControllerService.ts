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
    public static getFacilities(): CancelablePromise<Array<FacilityDto>> {
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
    public static putFacility(
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
    public static postFacility(
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
    public static getFacility(
        facilityId: number,
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
     * @returns number OK
     * @throws ApiError
     */
    public static deleteFacility(
        facilityId: number,
    ): CancelablePromise<number> {
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
