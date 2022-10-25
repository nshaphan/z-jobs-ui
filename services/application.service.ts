import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { IApplicationsResponse, INewApplicationInput, ICreateApplicationResponse } from './types';

export default ($axios: AxiosInstance) => ({
  GetApplications(page: number): Promise<IApplicationsResponse> {
    return $axios.get(`/applications?page=${page}`).then((res: AxiosResponse<IApplicationsResponse>) =>{
      const { data } = res
      return data
    }).catch((error: AxiosError) => {
      throw error
    })
  },
  CreateApplication(application: INewApplicationInput): Promise<ICreateApplicationResponse> {
    return $axios.post(
        '/applications',
        {
          ...application,
        }
      ).then((res: AxiosResponse<ICreateApplicationResponse>) => {
        return res?.data
    }).catch((error: AxiosError) => {
      throw error
    })
  },
  ChangeApplicationStatus(id: number, status: string) {
    return $axios.put(
      `/applications/${id}/status`,
      {
        status
      }
    ).then((res: AxiosResponse<ICreateApplicationResponse>) => {
        return res?.data
    }).catch((error: AxiosError) => {
      throw error
    })
  }
})
