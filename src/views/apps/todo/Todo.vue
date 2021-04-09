<template>
  <!-- Need to add height inherit because Vue 2 don't support multiple root ele -->
  <div style="height: inherit">
    <div
      class="body-content-overlay"
      :class="{ show: mqShallShowLeftSidebar }"
      @click="mqShallShowLeftSidebar = false"
    />
    <div class="todo-app-list">
      <!-- App Searchbar Header -->
      <div class="app-fixed-search d-flex align-items-center">
        <!-- Toggler -->
        <div class="sidebar-toggle d-block d-lg-none ml-1">
          <feather-icon
            icon="MenuIcon"
            size="21"
            class="cursor-pointer"
            @click="mqShallShowLeftSidebar = true"
          />
        </div>

        <!-- Searchbar -->
        <div class="d-flex align-content-center justify-content-between w-100">
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" class="text-muted" />
            </b-input-group-prepend>
            <b-form-input
              :value="searchQuery"
              placeholder="Search task"
              @input="updateRouteQuery"
            />
          </b-input-group>
        </div>

        <!-- Dropdown -->
        <div class="dropdown">
          <b-dropdown variant="link" no-caret toggle-class="p-0 mr-1" right>
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item @click="resetSortAndNavigate">
              Reset Sort
            </b-dropdown-item>
            <b-dropdown-item
              :to="{
                name: $route.name,
                query: { ...$route.query, sort: 'title-asc' },
              }"
            >
              Sort A-Z
            </b-dropdown-item>
            <b-dropdown-item
              :to="{
                name: $route.name,
                query: { ...$route.query, sort: 'title-desc' },
              }"
            >
              Sort Z-A
            </b-dropdown-item>
            <b-dropdown-item
              :to="{
                name: $route.name,
                query: { ...$route.query, sort: 'due-date' },
              }"
            >
              Sort Due Date
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <!-- Todo List -->
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="todo-task-list-wrapper list-group scroll-area"
      >
        <div style="width: 55%; margin: auto" v-if="lazyload">
          <div class="text-center">
            <b-spinner variant="primary" label="Text Centered" />
            <!-- <h1>okdsodksod</h1>
             -->
            <h3
              class="my-2 font-weight-bolder text-primary"
              style="margin: auto"
            >
              Loading...
            </h3>
          </div>
        </div>
        <draggable
          v-model="tasks"
          handle=".draggable-task-handle"
          tag="ul"
          class="todo-task-list media-list"
        >
          <li
            v-for="task in tasks"
            :key="task.key"
            class="todo-item"
            :class="{ completed: task.isCompleted }"
            @click="handleTaskClick(task)"
          >
            <feather-icon
              icon="MoreVerticalIcon"
              class="draggable-task-handle d-inline"
            />
            <div class="todo-title-wrapper">
              <div class="todo-title-area">
                <div class="title-wrapper">
                  <b-form-checkbox
                    :checked="task.isCompleted"
                    @click.native.stop
                    @change="updateTaskIsCompleted(task)"
                  />
                  <span class="todo-title">{{ task.title }}</span>
                </div>
              </div>
              <div class="todo-item-action">
                <div class="badge-wrapper mr-1">
                  <b-badge
                    v-for="tag in task.tags"
                    :key="tag"
                    pill
                    :variant="`light-${resolveTagVariant(tag)}`"
                    class="text-capitalize"
                  >
                    {{ tag }}
                  </b-badge>
                </div>
                <small class="text-nowrap text-muted mr-1">{{
                  formatDate(task.dueDate, { month: "short", day: "numeric" })
                }}</small>
                <b-avatar
                  v-if="task.assignee"
                  size="32"
                  :src="task.assignee.avatar"
                  :variant="`light-${resolveAvatarVariant(task.tags)}`"
                  :text="avatarText(task.assignee.fullName)"
                />
                <b-avatar v-else size="32" variant="light-secondary">
                  <feather-icon icon="UserIcon" size="16" />
                </b-avatar>
              </div>
            </div>
          </li>
        </draggable>
        <div class="demo-spacing-0" v-if="rows > 0">
          <!-- Use text in props -->
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap"> Showing 1 to </span>
              <b-form-select
                :value="perPage"
                :options="['10', '20', '30']"
                class="mx-1"
                @input="(value) => (perPage = value)"
              />
              <span class="text-nowrap"> of {{ rows }} entries </span>
            </div>
            <div>
              <b-pagination
                :value="page"
                :total-rows="rows"
                :per-page="perPage"
                align="right"
                first-text="First"
                prev-text="Prev"
                next-text="Next"
                last-text="Last"
                class="mt-1 mb-0 mx-1"
                @input="(value) => (page = value)"
              >
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </div>
          </div>
        </div>
        <!--        <div-->
        <!--          class="no-results"-->
        <!--          :class="{'show': !tasks.length}"-->
        <!--        >-->
        <!--          <h5>No Items Found</h5>-->
        <!--        </div>-->
      </vue-perfect-scrollbar>
    </div>

    <!-- Task Handler -->
    <todo-task-handler-sidebar
      v-model="isTaskHandlerSidebarActive"
      :task="task"
      :clear-task-data="clearTaskData"
      @remove-task="removeTask"
      @add-task="addTask"
      @update-task="updateTask"
    />

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-left">
      <todo-left-sidebar
        :task-tags="taskTags"
        :is-task-handler-sidebar-active.sync="isTaskHandlerSidebarActive"
        :class="{ show: mqShallShowLeftSidebar }"
        @close-left-sidebar="mqShallShowLeftSidebar = false"
      />
    </portal>
  </div>
</template>

<script>
import store from "@/store";
import { ref, watch, computed, onUnmounted } from "@vue/composition-api";
import {
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  BDropdown,
  BDropdownItem,
  BFormCheckbox,
  BBadge,
  BAvatar,
  BPagination,
  BFormSelect,
  BSpinner,
} from "bootstrap-vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import draggable from "vuedraggable";
import { formatDate, avatarText } from "@core/utils/filter";
import { useRouter } from "@core/utils/utils";
import { useResponsiveAppLeftSidebarVisibility } from "@core/comp-functions/ui/app";
import TodoLeftSidebar from "./TodoLeftSidebar.vue";
import todoStoreModule from "./todoStoreModule";
import TodoTaskHandlerSidebar from "./TodoTaskHandlerSidebar.vue";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Vue from "vue";
import { ToastPlugin } from "bootstrap-vue";
Vue.use(ToastPlugin);
const v = new Vue();
export default {
  components: {
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
    BFormCheckbox,
    BBadge,
    BAvatar,
    draggable,
    BPagination,
    BFormSelect,
    BSpinner,
    VuePerfectScrollbar,
    ToastificationContent,

    // App SFC
    TodoLeftSidebar,
    TodoTaskHandlerSidebar,
  },
  setup() {
    const TODO_APP_STORE_MODULE_NAME = "app-todo";

    const variants = [
      "primary",
      "secondary",
      "danger",
      "warning",
      "success",
      "info",
      "light",
      "dark",
    ];
    // Register module
    if (!store.hasModule(TODO_APP_STORE_MODULE_NAME))
      store.registerModule(TODO_APP_STORE_MODULE_NAME, todoStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TODO_APP_STORE_MODULE_NAME))
        store.unregisterModule(TODO_APP_STORE_MODULE_NAME);
    });

    const { route, router } = useRouter();
    const routeSortBy = computed(() => route.value.query.sort);
    const routeQuery = computed(() => route.value.query.q);
    const routeParams = computed(() => route.value.params);
    const routePage = computed(() => route.value.query.page ?? 1);
    const routePerPage = computed(() => route.value.query.perPage ?? 10);
    watch(routeParams, () => {
      // eslint-disable-next-line no-use-before-define
      fetchTasks();
    });

    const tasks = ref([]);

    const sortOptions = [
      "latest",
      "title-asc",
      "title-desc",
      "assignee",
      "due-date",
    ];
    const sortBy = ref(routeSortBy.value);
    watch(routeSortBy, (val) => {
      if (sortOptions.includes(val)) sortBy.value = val;
      else sortBy.value = val;
    });
    const resetSortAndNavigate = () => {
      const currentRouteQuery = JSON.parse(JSON.stringify(route.value.query));

      delete currentRouteQuery.sort;

      router
        .replace({ name: route.name, query: currentRouteQuery })
        .catch(() => {});
    };

    const blankTask = {
      id: null,
      title: "",
      dueDate: new Date(),
      description: "",
      assignee: null,
      tags: [],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    };
    const task = ref(JSON.parse(JSON.stringify(blankTask)));
    const clearTaskData = () => {
      task.value = JSON.parse(JSON.stringify(blankTask));
    };

    const alert = (variant, message) => {
      v.$toast({
        component: ToastificationContent,
        props: {
          title: "Notification",
          icon: "BellIcon",
          text: "👋 " + message,
          variant,
        },
      });
    };

    const addTask = (val) => {
      store.dispatch("app-todo/addTask", val).then((response) => {
        // eslint-disable-next-line no-use-before-define
        if (response.data.success) {
          alert("success", "Create task successfully.");
        } else {
          alert("danger", "Create task failed.");
        }
        fetchTasks();
      });
    };
    const removeTask = () => {
      if (confirm("Are you sure you want to remove?")) {
        store
          .dispatch("app-todo/removeTask", task.value._id)
          .then(({ data }) => {
            // eslint-disable-next-line no-use-before-define
            if (data.success) {
              alert("success", "Delete task successfully.");
            } else {
              alert("danger", "Delete task failed.");
            }
            fetchTasks();
          });
      }
    };
    const updateTask = (taskData) => {
      store.dispatch("app-todo/updateTask", { taskData }).then(({ data }) => {
        // eslint-disable-next-line no-use-before-define
        if (data.success) {
          alert("success", "Update task successfully.");
        } else {
          alert("danger", "Update task failed.");
        }
        fetchTasks();
      });
    };
    const updateStatusTask = (taskData) => {
      store
        .dispatch("app-todo/updateStatusTask", {
          _id: taskData._id,
          isCompleted: taskData.isCompleted,
        })
        .then(({ data }) => {
          // eslint-disable-next-line no-use-before-define
          if (data.success) {
            alert("success", "Change status task successfully.");
          } else {
            alert("danger", "Change status task failed.");
          }
          fetchTasks();
        });
    };

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    };

    const isTaskHandlerSidebarActive = ref(false);

    const taskTags = [
      {
        title: "Team",
        color: "primary",
        route: { name: "apps-todo-tag", params: { tag: "team" } },
      },
      {
        title: "Low",
        color: "success",
        route: { name: "apps-todo-tag", params: { tag: "low" } },
      },
      {
        title: "Medium",
        color: "warning",
        route: { name: "apps-todo-tag", params: { tag: "medium" } },
      },
      {
        title: "High",
        color: "danger",
        route: { name: "apps-todo-tag", params: { tag: "high" } },
      },
      {
        title: "Update",
        color: "info",
        route: { name: "apps-todo-tag", params: { tag: "update" } },
      },
    ];

    const resolveTagVariant = (tag) => {
      if (tag === "team") return "primary";
      if (tag === "low") return "success";
      if (tag === "medium") return "warning";
      if (tag === "high") return "danger";
      if (tag === "update") return "info";
      return "primary";
    };

    const resolveAvatarVariant = (tags) => {
      if (tags.includes("high")) return "primary";
      if (tags.includes("medium")) return "warning";
      if (tags.includes("low")) return "success";
      if (tags.includes("update")) return "danger";
      if (tags.includes("team")) return "info";
      return "primary";
    };

    // Search Query
    const searchQuery = ref(routeQuery.value);
    watch(routeQuery, (val) => {
      searchQuery.value = val;
    });

    // currentPage
    const page = ref(routePage.value);
    watch(routePage, (val) => {
      routePage.value = val;
    });

    // Search Query
    const perPage = ref(routePerPage.value);
    watch(routePerPage, (val) => {
      routePerPage.value = val;
    });
    // eslint-disable-next-line no-use-before-define
    watch([searchQuery, sortBy, page, perPage], () => fetchTasks());
    const updateRouteQuery = (val) => {
      const currentRouteQuery = JSON.parse(JSON.stringify(route.value.query));

      if (val) currentRouteQuery.q = val;
      else delete currentRouteQuery.q;

      router.replace({ name: route.name, query: currentRouteQuery });
    };

    const rows = ref(0);
    const lazyload = ref(true);
    const fetchTasks = () => {
      store
        .dispatch("app-todo/fetchTasks", {
          q: searchQuery.value,
          filter: router.currentRoute.params.filter,
          tag: router.currentRoute.params.tag,
          sort: sortBy.value ?? "title-desc",
          page: page.value,
          perPage: perPage.value,
        })
        .then((response) => {
          if (response.data.success) {
            lazyload.value = false;
            tasks.value = response.data.data;
            rows.value = response.data.totalRecords;
          }
        });
    };

    fetchTasks();

    const handleTaskClick = (taskData) => {
      task.value = taskData;
      isTaskHandlerSidebarActive.value = true;
    };

    // Single Task isCompleted update
    const updateTaskIsCompleted = (taskData) => {
      // eslint-disable-next-line no-param-reassign
      taskData.isCompleted = !taskData.isCompleted;
      updateStatusTask(taskData);
    };

    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility();

    return {
      alert,
      lazyload,
      variants,
      task,
      tasks,
      removeTask,
      addTask,
      updateTask,
      updateStatusTask,
      clearTaskData,
      taskTags,
      searchQuery,
      page,
      perPage,
      rows,
      fetchTasks,
      perfectScrollbarSettings,
      updateRouteQuery,
      resetSortAndNavigate,

      // UI
      resolveTagVariant,
      resolveAvatarVariant,
      isTaskHandlerSidebarActive,

      // Click Handler
      handleTaskClick,

      // Filters
      formatDate,
      avatarText,

      // Single Task isCompleted update
      updateTaskIsCompleted,

      // Left Sidebar Responsive
      mqShallShowLeftSidebar,
    };
  },
};
</script>

<style lang="scss" scoped>
.draggable-task-handle {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  visibility: hidden;
  cursor: move;

  .todo-task-list .todo-item:hover & {
    visibility: visible;
  }
}
</style>

<style lang="scss">
@import "~@core/scss/base/pages/app-todo.scss";
</style>
