<template>
  <div>
    <!-- Filters -->
    <users-list-filters
      :group.sync="group"
      :gender.sync="gender"
      :group-options="groupOptions"
      :gender-options="genderOptions"
    />

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <b-button
                class="mr-1"
                variant="primary"
                :to="{ name: 'apps-customers-add' }"
              >
                <span class="text-nowrap"
                  ><feather-icon icon="PlusCircleIcon"
                /></span>
              </b-button>

              <b-button
                class="mr-1"
                variant="primary"
                :to="{ name: 'apps-customers-add' }"
              >
                <span class="text-nowrap"
                  ><feather-icon icon="Trash2Icon"
                /></span>
              </b-button>

              <b-dropdown
                id="dropdown-grouped"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                right
                class="dropdown-icon-wrapper"
              >
                <template #button-content>
                  <feather-icon
                    icon="DownloadIcon"
                    size="14"
                    class="align-middle"
                  />
                </template>
                <b-dropdown-item>Export PDF</b-dropdown-item>
                <b-dropdown-item>Export Excel</b-dropdown-item>
              </b-dropdown>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="Users"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: STT -->
        <template #cell(stt)="data">
          {{ data.index + 1 }}
        </template>
        <!-- Column: User -->
        <template #cell(avatar)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                src="/img/5-small.a4eb6d6e.png"
                :text="avatarText(data.item.name)"
                :variant="`light-${resolveUserRoleVariant(data.item.role)}`"
                :to="{
                  name: 'apps-customers-view',
                  params: { id: data.item._id },
                }"
              />
            </template>
            <b-link
              :to="{
                name: 'apps-customers-view',
                params: { id: data.item._id },
              }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.fullName }}
            </b-link>
          </b-media>
        </template>

        <!-- Column: birthDate -->
        <template #cell(birthDate)="data">
          {{ convertDate(data.value) }}
        </template>

        <!-- Column: lastTrading -->
        <template #cell(gender)="data">
          {{ data.value == 1 ? 'Nam' : 'Nữ' }}
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item
              :to="{
                name: 'apps-customers-view',
                params: { id: data.item._id },
              }"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item
              :to="{
                name: 'apps-customers-edit',
                params: { id: data.item._id },
              }"
            >
              <feather-icon icon="PlusCircleIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="deleteUser(data.item._id)"
            >
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted"
              >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
              {{ dataMeta.of }} entries</span
            >
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              :value="currentPage"
              :total-rows="totalUsers"
              :per-page="perPage"
              align="right"
              first-text="First"
              prev-text="Prev"
              next-text="Next"
              last-text="Last"
              class="mt-1 mb-0"
              @input="(value) => (currentPage = value)"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  // BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import UsersListFilters from "./UsersListFilters.vue";
import useUsersList from "./useUsersList";
import userStoreModule from "../userStoreModule";
import Ripple from "vue-ripple-directive";
import moment from "moment";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Vue from "vue";
import {ToastPlugin} from "bootstrap-vue";

Vue.use(ToastPlugin)
const v = new Vue()

export default {
  components: {
    UsersListFilters,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    // BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = "app-user";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    const groupOptions = [
      { label: "Khách hàng thường", value: 0 },
      { label: "khách hàng thân thiết", value: 1 },
      { label: "Khách hàng tiềm năng", value: 2 },
    ];

    const genderOptions = [
      { label: "Nam", value: 0 },
      { label: "Nữ", value: 1 },
    ];

    const convertDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };

    const {
      Users,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      refetchData,
      deleteUser,
      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      // Extra Filters
      group,
      gender,
    } = useUsersList();

    return {
      Users,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      convertDate,
      refetchData,
      deleteUser,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,

      groupOptions,
      genderOptions,

      // Extra Filters
      gender,
      group,
    };
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
