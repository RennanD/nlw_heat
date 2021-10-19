interface IRequest {
  content: string;
  user_id: string;
}

export class CreateMessagesService {
  async run({ content, user_id }: IRequest): Promise<void> {}
}
