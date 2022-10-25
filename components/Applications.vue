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
            <option value="PENDING">Pending</option>
            <option value="PASSED">Accepted</option>
            <option value="DROPPED">Rejected</option>
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
              <h5 class="mb-1 text-dark">{{ application.name }}
                  <span
                    v-if="application?.status !== 'PENDING'"
                    class="badge"
                    :class="application.status === 'PASSED' ? 'bg-success' : 'bg-danger'"
                  >
                    {{ application?.status }}
                  </span>
                  <span
                    v-if="application?.status === 'PENDING'"
                    class="badge bg-info"
                  >
                    {{ application?.status }}
                  </span>
              </h5>
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
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#" tabindex="-1" :class="pagination.page===1 ? 'disabled': ''" @click.prevent="prev()">Prev</a>
              </li>
              <li class="page-item ms-2">
                <a class="page-link" href="#" :class="pagination.page === pagination.pages ? 'disabled': ''" @click.prevent="next()">Next</a>
              </li>
            </ul>
          </nav>
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
                <h4 class="text-secondary">{{ currentApplication?.position }}
                  <span
                    v-if="currentApplication?.status !== 'PENDING'"
                    class="badge"
                    :class="currentApplication?.status === 'PASSED' ? 'bg-success' : 'bg-danger'"
                  >
                    {{ currentApplication?.status }}
                  </span>
                  <span
                    v-if="currentApplication?.status === 'PENDING'"
                    class="badge bg-info"
                  >
                    {{ currentApplication?.status }}
                  </span>
                </h4>
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
                class="btn btn-danger"
                @click="changeStatus('rejected')"
              >
                Reject
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="changeStatus('accepted')"
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

interface Pagination {
  page: number;
  total: number;
  limit?: number;
  pages: number;
}

interface ComponentData {
  filter: string;
  applications: IApplication[]
  showApplicationDetailsModal: boolean
  currentApplication?: IApplication | null
  pagination: Pagination
  formLoading: boolean
}

export default Vue.extend({
  name: 'ApplicationsPage',

  data(): ComponentData {
    return {
      filter: 'all',
      applications: [],
      showApplicationDetailsModal: false,
      currentApplication: null,
      formLoading: false,
      pagination: {
        page: 1,
        total: 0,
        limit: 10,
        pages: 0,
      }
    }
  },
  async fetch() {
    const res = await this.$applicationService.GetApplications(this.pagination.page)
    this.applications = res.applications
    this.pagination = {
      page: res.page,
      total: res.total,
      pages: res.pages
    }
  },
  computed: {
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
    },

    changeStatus(status: string) {
      this.$applicationService.ChangeApplicationStatus(Number(this.currentApplication?.id), status)
        .then((res) => {
          this.currentApplication = res.application
          this.currentApplication = null
          this.showApplicationDetailsModal = false
          this.$toast.success('Status changed successfully')
          this.$fetch()
        })
        .catch((err) => {
          this.$toast.error(err.message)
        })
    },
    next() {
      this.pagination.page += 1
      this.$fetch()
    },
    prev() {
      this.pagination.page -= 1
      this.$fetch()
    }
  },
})
</script>
