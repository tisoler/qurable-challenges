
export interface Event {
  id?: number,
  name: string,
  description: string,
  dateTime: Date | null,
  attendance?: number,
}

export interface Registration {
  idEvent: number,
  date?: Date,
  fullname: string,
}

export interface Login {
  username: string,
  password: string,
}

export interface UserData {
  userId: number,
  username: string,
  roles: string[],
  scope: string[],
}
