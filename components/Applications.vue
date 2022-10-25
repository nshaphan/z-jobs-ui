<template>
  <div>
    <div class="container">

      <div class="mt-2">
      <h2 class="my-4 text-primary">Applications</h2>
      <div class="filter">
        <div class="form-floating mb-3">
          <select
            id="filter"
            v-model="filter"
            class="form-select form-select-lg fw-bold text-dark border-1"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
          <label for="status">Status</label>
        </div>
      </div>
        <div class="list-group">
          <div
            v-for="application in filteredApplications"
            :key="application.id"
            class="list-group-item list-group-item-action mb-2 border rounded"
            style="cursor: pointer"
            @click="showApplication(application)"
          >
            <div class="w-100">
              <h5 class="mb-1 text-dark">{{ application.name }}  <span class="badge bg-info">PENDING</span></h5>
              <p class="mb-2 text-secondary">{{ application.position}}</p>
              <small>{{ new Intl.DateTimeFormat('en-US', {
                month: "long",
                day: "numeric",
                year: "numeric"
              }).format(new Date(application?.createdAt || "")) }}</small>
            </div>
          </div>
          <div v-if="filteredApplications.length === 0" class="text-center">
            <h3 class="text-secondary">No applications found</h3>
          </div>

        </div>
      </div>
    </div>

    <!-- Modal -->
    <Modal :show="showApplicationDetailsModal" show-close show-header @close="showApplicationDetailsModal = false">
      <div class="mt-2 mr-4">
        <h1 class="main-heading mt-0">{{ currentApplication?.name }}</h1>
        <div>
          <a class="btn border rounded-0" :href="currentApplication?.resume">
        <fa-icon
          icon="download"
          regular
          class="text-primary"
        ></fa-icon>
        Download CV</a> <span class="ms-2 text-secondary"> | <span class="ps-2">
        Applied on {{ currentApplication && new Intl.DateTimeFormat('en-US', {
                month: "long",
                day: "numeric",
                year: "numeric"
              }).format(new Date(currentApplication?.createdAt || "")) }}</span></span>
        </div>

          <div>
            <div class="mt-4">
              <!-- Application Details -->
              <div>
                <h4 class="text-secondary">{{ currentApplication?.position }} <span class="badge bg-info">{{ currentApplication?.status }}</span></h4>
              </div>
              <div>
                <span class="fw-bold">Email: </span> {{ currentApplication?.email }}
              </div>
              <div>
                <span class="fw-bold">Phone: </span> {{ currentApplication?.phone }}
              </div>

              <div class="mt-4">
                <h5>Cover Letter</h5>
                <p>
                  {{ currentApplication?.coverLetter }}
                </p>
              </div>
            </div>
            <div class="modal-footer border-top-0">
              <button
                type="button"
                class="btn btn-light"
                @click="showApplicationDetailsModal = false"
              >
                Reject
              </button>
              <button
                type="button"
                class="btn btn-primary"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {IApplication} from "~/services/types";

interface ComponentData {
  filter: string;
  applications: IApplication[]
  showApplicationDetailsModal: boolean
  currentApplication?: IApplication | null
}

export default Vue.extend({
  name: 'ApplicationsPage',

  data(): ComponentData {
    return {
      filter: 'all',
      applications: [],
      showApplicationDetailsModal: false,
      currentApplication: null
    }
  },
  async fetch() {
    const res = await this.$applicationService.GetApplications()
    this.applications = res.applications
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters["user/isLoggedIn"]
    },
    user() {
      return this.$store.getters["user/user"]
    },
    filteredApplications: {
      get(): IApplication[] {
        if (this.filter === 'all') {
          return this.applications
        }
        return this.applications.filter((application) => application.status === this.filter)
      }
    }
  },
  methods: {
    showApplication(application: IApplication) {
      this.currentApplication = application
      this.showApplicationDetailsModal = true
    }
  },
})
</script>
