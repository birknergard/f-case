/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PassportDto } from './PassportDto';
import type { QuestionResponseDto } from './QuestionResponseDto';
import type { UserInfoDto } from './UserInfoDto';
export type EventRegistrationDto = {
    userId: string;
    eventId: string;
    userInfo?: (null | UserInfoDto);
    passport?: (null | PassportDto);
    roomType?: string;
    requestedRoomateName?: string;
    consideration?: string;
    dietPreferences?: Array<string>;
    extraQuestionResponses?: Array<QuestionResponseDto>;
    registeredActivityIds?: Array<string>;
    registrationDate?: string;
};

