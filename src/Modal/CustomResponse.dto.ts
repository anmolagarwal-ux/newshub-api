export class CustomResponse<T> {
    message!: string;
    statusCode!: number;
    isSuccess: boolean = false;
    response!: T;
}

export class DBCustomResponse{
    message!: string;
    isSuccess: boolean = false;
}