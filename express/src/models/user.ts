export interface User {
  userId: string;
  name: string;
  role: string | null;
}

export function newUser(userId: string): User {
  return {
    userId,
    name: "",
    role: null,
  };
}
