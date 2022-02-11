export interface User {
  userId: number;
  userName: string;
  profileImage: string;
  docId: string;
}

export interface Content {
  date: number;
  text: string;
  userId: number;
}
