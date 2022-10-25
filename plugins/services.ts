import applicationService from "~/services/application.service"

export default (ctx: any, inject: any) => {
  inject('applicationService', applicationService(ctx.$axios))
}
