export class OrderError extends Error {
    public code: number;
    private type: ErrorType;
    private cause: string;
    constructor(message: string, code: number, type: ErrorType, cause: string) {
        super(message);
        Object.setPrototypeOf(this, OrderError.prototype);
        this.code = code;
        this.type = type;
        this.cause = cause;
    }
}

export enum ErrorType { API, HANA, LOGIC };