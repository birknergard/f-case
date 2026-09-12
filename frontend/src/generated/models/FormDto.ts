/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormQuestionDto } from './FormQuestionDto';
export type FormDto = {
    eventId: string;
    hasDisabledPassportSection?: boolean;
    hasDisabledRoomSection?: boolean;
    deadline: string;
    questions?: Array<FormQuestionDto>;
};

