<template>
  <div>
    <div class="container">
        <div class="row vh-100  mb-0 justify-content-center align-content-center">
          <div class="text-center mb-4">
            <h1 class="text-dark">We are Hiring Full-Stack Software Engineers</h1>
          </div>
          <div class="text-center">
            <h1>Interested?</h1>
          </div>
          <div class="text-center" @click="showApplyModal = true">
            <button class="btn border-5 border-success px-4 ">Join us</button>
          </div>
        </div>
    </div>
<!--     Modal -->
    <Modal
      :show="showApplyModal"
      show-close
      @close="showApplyModal = false">
      <div class="mt-2 mr-4">
        <h1 class="main-heading mt-0">Application Form</h1>
        <div>
          <div class="form">
          <fieldset class="mt-4">
            <div class="form-floating mb-3 has-validation">
              <input
                id="name"
                v-model="newApplication.name"
                type="text"
                class="form-control form-control-lg fw-bold text-dark border-1"
                placeholder="Enter your name"
                :disabled="formLoading"
              />
              <label for="name">Name</label>
            </div>
          </fieldset>
          <fieldset>
            <div class="form-floating mb-3 has-validation">
              <input
                id="email"
                v-model="newApplication.email"
                type="email"
                class="form-control form-control-lg fw-bold text-dark border-1"
                placeholder="Enter your email"
                :disabled="formLoading"
              />
              <label for="email">Email</label>
            </div>
          </fieldset>
          <fieldset>
            <div class="form-floating mb-3 has-validation">
              <input
                id="phone"
                v-model="newApplication.phone"
                type="text"
                class="form-control form-control-lg fw-bold text-dark border-1"
                placeholder="Enter your phone"
                :disabled="formLoading"
              />
              <label for="phone">Phone</label>
            </div>
          </fieldset>
            <div class="mb-3 has-validation">
              <label for="resume" class="form-label">Upload CV</label>
              <input
                id="resume"
                class="form-control"
                type="file"
                placeholder="Upload your CV"
                accept=".pdf"
                :disabled="formLoading"
                @change="onFileChange($event)"
              >
            </div>
            <fieldset>
              <div class="form-floating mb-3 has-validation">
                      <textarea
                        id="coverLetter"
                        v-model="newApplication.coverLetter"
                        class="form-control form-control-lg fw-bold text-dark border-1"
                        name="coverLetter"
                        placeholder="Cover Letter"
                        rows="5"
                        :disabled="formLoading"
                      />
                <label for="coverLetter">Cover Letter</label>

              </div>

            </fieldset>
          </div>
          <div>
            <div class="modal-footer border-top-0">
              <button
                type="button"
                class="btn btn-light"
                @click="showApplyModal = false"
              >
                Cancel
              </button>
              <button
                v-if="!formLoading"
                type="button"
                class="btn btn-primary"
                @click="apply()"
              >
                Submit
              </button>
              <button v-if="formLoading" class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Submitting...
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import {IBackendError, INewApplicationInput} from "~/services/types";

interface ComponentData {
  newApplication: INewApplicationInput
  showApplyModal: boolean
  formErrors: {
    [x: string]: string
  }
  formLoading: boolean
}

export default Vue.extend({
  name: 'IndexPage',

  data(): ComponentData {
    return {
      formErrors: {
        name: '',
        email: '',
        phone: '',
        resume: '',
        coverLetter: '',
      },
      formLoading: false,
      newApplication: {
        name: '',
        email: '',
        phone: '',
        resume:  '',
        coverLetter: '',
      },
      showApplyModal: false,
    }
  },
  methods: {
    apply() {
      this.formLoading = true
      this.$applicationService.CreateApplication({
        name: this.newApplication.name,
        email: this.newApplication.email,
        phone: this.newApplication.phone,
        resume: this.newApplication.resume,
        coverLetter: this.newApplication.coverLetter,
      })
        .then(() => {
          this.showApplyModal = false
          this.$toast.success('Application Submitted')
          this.formLoading = false
        })
        .catch((err) => {
          if (err.response.data?.errors?.length) {
            this.$toast.error(err.response.data.message || "Error Occurred!")
            const errors: {[x:string]: string} = {}
            err.response.data.errors.forEach((error: IBackendError) => {
              errors[error.param] = error.msg
            })
            this.formErrors = errors
          } else {
            this.$toast.error(err.response.data.message || "Error Occurred!")
          }
          this.formLoading = false
        })
    },
    onFileChange($event: Event) {
      // Read file as URL
      const file = ($event.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.newApplication.resume = reader.result as string
        }
      }
    },
  },
})
</script>
