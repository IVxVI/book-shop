export type ContactRequest = {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  message: string,

  resolved: boolean,
  createdAt: string,
}