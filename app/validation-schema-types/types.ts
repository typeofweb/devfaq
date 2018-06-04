// tslint:disable:ordered-imports max-line-length variable-name
// THIS FILE IS GENERATED BY JOI-TS-GENERATOR. ANY CHANGES MADE WILL BE LOST.
import { QuestionCategories, QuestionCategory, QuestionLevel, QuestionLevels, QuestionStatus, QuestionStatuses } from '../entity/question/Question.model';

export type GetQuestionsResponse = PartiallyUpdateQuestionResponse[];

export interface PartiallyUpdateQuestionResponse {
  id: number;
  question: string;
  category: QuestionCategory;
  level?: string;
  answer?: string;
  acceptedAt?: Date;
}

export interface GetQuestionsRequestQuery {
  category?: QuestionCategory;
  status?: QuestionStatuses;
  level?: QuestionLevels;
}

export interface GeneratePdfRequestQuery {
  question: number[];
}

// Unknown type: GeneratePdfRequest ([object Object])}
// Unknown type: GetQuestionsRequest ([object Object])}
export interface CreateQuestionRequestPayload {
  question: string;
  level?: string;
  category: QuestionCategory;
}

// Unknown type: CreateQuestionRequest ([object Object])}
export interface PartiallyUpdateQuestionResponse {
  id: number;
  question: string;
  category: QuestionCategory;
  level?: string;
  answer?: string;
  acceptedAt?: Date;
}

export interface PartiallyUpdateQuestionRequestPayload {
  status?: QuestionStatus;
  question?: string;
  category?: QuestionCategory;
  level?: string;
  answer?: string;
}

export interface PartiallyUpdateQuestionRequestParams {
  id: number;
}

// Unknown type: PartiallyUpdateQuestionRequest ([object Object])}
export interface PartiallyUpdateQuestionResponse {
  id: number;
  question: string;
  category: QuestionCategory;
  level?: string;
  answer?: string;
  acceptedAt?: Date;
}

export interface DeleteQuestionRequestParams {
  id: number;
}

// Unknown type: DeleteQuestionRequest ([object Object])}
// Unknown type: DeleteQuestionResponse ([object Object])}
export interface CreateTokenRequestPayload {
  email: string;
  password: string;
}

// Unknown type: CreateTokenRequest ([object Object])}
export interface CreateTokenResponse {
  token: string;
}

// Unknown type: number[] ([object Object])}
export { QuestionCategories, QuestionCategory, QuestionLevel, QuestionLevels, QuestionStatus, QuestionStatuses };
