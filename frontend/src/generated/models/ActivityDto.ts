/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageDto } from './ImageDto';
export type ActivityDto = {
    id: string;
    startDateTime?: string;
    endDateTime?: string;
    name: string;
    description?: string;
    place: string;
    address: string;
    postalCode: string;
    city: string;
    infoLinkUrl?: string;
    eventId: string;
    images?: Array<ImageDto>;
    requiresRegister: boolean;
    maxParticipants?: number | string | null;
};

