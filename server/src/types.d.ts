import type {Request, RequestHandler} from 'express';
import type {ParamsDictionary} from 'express-serve-static-core';

export type Response<TData, TError> = {
    success: true;
    data: TData;
} | {
    success: false;
    error: TError;
}

export type AuthRequest = Request & {
    id?: string;
}

export type Handler<TData = any, TError = any> = RequestHandler<ParamsDictionary, Response<TData, TError>>;
