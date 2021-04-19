<template>
  <div>
    <!-- Filters -->
    <users-list-filters
      :role.sync="role"
      :gender.sync="gender"
      :active.sync="active"
      :role-options="roleOptions"
      :gender-options="genderOptions"
      :active-options="activeOptions"
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
                :to="{ name: 'apps-users-add' }"
              >
                <span class="text-nowrap"
                  ><feather-icon icon="PlusCircleIcon"
                /></span>
              </b-button>
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
        <!-- Column: Stt -->
        <template #cell(stt)="data">
          {{ data.index + 1 }}
        </template>

        <!-- Column: name -->
        <template #cell(name)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="api + data.item.avatar"
                :text="avatarText(data.item.name)"
                :variant="`light-${resolveUserRoleVariant(data.item.role)}`"
                :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.name }}
            </b-link>
          </b-media>
        </template>

        <!-- Column: Role -->
        <template #cell(role)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="resolveUserRoleIcon(data.item.role)"
              size="18"
              class="mr-50"
              :class="`text-${resolveUserRoleVariant(data.item.role)}`"
            />
            <span class="align-text-top text-capitalize">{{
              data.item.role == 0 ? "Nhận viên" : "Quản lý"
            }}</span>
          </div>
        </template>
        <!-- Column: birthDay -->
        <template #cell(birthDay)="data">
          {{ convertDate(data.value) }}
        </template>

        <!-- Column: Gender -->
        <template #cell(gender)="data">
          {{ data.value == 0 ? "Nam" : "Nữ" }}
        </template>

        <!-- Column: Active -->
        <template #cell(active)="data">
          {{ data.value == 0 ? "NonActive" : "Active" }}
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
                name: 'apps-users-view',
                params: { id: data.item._id },
              }"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item
                    :to="{
                name: 'apps-users-edit',
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

            <b-dropdown-item
                    @click="restoreUser(data.item._id)"
            >
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Restore</span>
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
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormCheckbox,
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import UsersListFilters from "./UsersListFilters.vue";
import useUsersListDel from "./useUsersListDel";
import userStoreModule from "../userStoreModule";
import UserListAddNew from "./UserListAddNew.vue";
import Ripple from "vue-ripple-directive";
import moment from "moment";

export default {
  components: {
    UsersListFilters,
    UserListAddNew,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormCheckbox,
    vSelect,
  },
  directives: {
    Ripple,
  },
  setup() {
    const api = process.env.VUE_APP_ROOT_API;
    const USER_APP_STORE_MODULE_NAME = "app-user";

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
      store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME))
        store.unregisterModule(USER_APP_STORE_MODULE_NAME);
    });

    const isAddNewUserSidebarActive = ref(false);

    const roleOptions = [
      { label: "Nhân viên", value: 0 },
      { label: "Quản lí", value: 1 },
    ];

    const genderOptions = [
      { label: "Nam", value: 0 },
      { label: "Nữ", value: 1 },
    ];

    const activeOptions = [
      { label: "InActive", value: 0 },
      { label: "Active", value: 1 },
    ];

    const convertDate = (date) => {
      return moment(date).format("DD-MM-YYYY");
    };

    const {
      fetchUsers,
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
      restoreUser,
      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,

      // Extra Filters
      role,
      gender,
      active,
    } = useUsersListDel();

    return {
      // Sidebar
      isAddNewUserSidebarActive,
      api,
      fetchUsers,
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
      convertDate,
      deleteUser,
      restoreUser,

      // Filter
      avatarText,

      // UI
      resolveUserRoleVariant,
      resolveUserRoleIcon,

      roleOptions,
      genderOptions,
      activeOptions,
      // Extra Filters
      role,
      gender,
      active,
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
