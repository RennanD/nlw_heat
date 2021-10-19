class NotFoundError {
  public readonly message: string;

  public readonly status_code: number;

  public readonly type_error: string;

  constructor(message: string) {
    this.message = message;
    this.status_code = 404;
    this.type_error = 'not_found';
  }
}

export { NotFoundError };
