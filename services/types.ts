export interface IApplication {
  id?: number
  name: string,
  email: string,
  phone: string,
  resume: string,
  coverLetter: string,
  position: string,
  createdAt?: string,
  status?: string,
}

export interface IApplicationsResponse {
  success: boolean;
  message: string;
  applications: IApplication[]
}

export interface IApplicationResponse {
  success: boolean;
  message: string;
  application: IApplication
}

export interface INewApplicationInput{
  name: string,
  email: string,
  phone: string,
  resume: string,
  coverLetter: string,
}

export interface ICreateApplicationResponse {
  success: boolean;
  message:string;
  application: IApplication;
}

type Field = 'name' | 'email' | 'phone' | 'resume' | 'coverLetter' | 'linkedIn' | 'github' | 'portfolio'

export interface IBackendError {
  msg: string,
  param: Field,
}

