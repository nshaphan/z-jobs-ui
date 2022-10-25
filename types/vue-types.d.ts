import { INewApplicationInput, ICreateApplicationResponse, IApplicationsResponse } from './../services/types';
declare module 'vue/types/vue' {
  interface Vue {
    $applicationService: {
      GetApplications: (page: number) => Promise<IApplicationsResponse>,
      CreateApplication: (application: INewApplicationInput) => Promise<ICreateApplicationResponse>,
      ChangeApplicationStatus: (id: number, status: string) => Promise<ICreateApplicationResponse>
    }

    // nuxt runtime
    $config: any
  }
}
