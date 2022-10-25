import { INewApplicationInput, ICreateApplicationResponse, IApplicationsResponse } from './../services/types';
declare module 'vue/types/vue' {
  interface Vue {
    $applicationService: {
      GetApplications: () => Promise<IApplicationsResponse>,
      CreateApplication: (application: INewApplicationInput) => Promise<ICreateApplicationResponse>,
    }

    // nuxt runtime
    $config: any
  }
}
