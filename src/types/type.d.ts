export interface IMessage {
  role: string;
  parts: Array<{ _id: string; text: string }>;
  img?: string;
}

export interface IUserChat {
  _id: string;
  userId: string;
  history: IMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface IChat {
  history: any;
  _id: string;
  title: string;
  createdAt: Date;
}
