declare class CustomError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
export declare const errorHandler: (statusCode: number, message: string) => CustomError;
export {};
//# sourceMappingURL=error.d.ts.map