<template>
  <div class="home" absolute w-full z-50>

    <!--<ul class="navbar">
    <li
      mt-0.5rem
      trans-0.2
      z-5
      hover:scale-110
      active:opacity-50
      active:scale-100
      cursor-pointer
      pointer-events-initial
      @click="goHome()"
    >
      <img src="/img/home.svg" w-3rem alt="home" />
    </li>
    

  </ul>-->
    <Menubar :model="items">

      <template #start>

        <RouterLink to="/" size-10> <img src="/img/logo.png" size-10 /></RouterLink>
      </template>
      <template #end>
        <div flex items-center gap-2>
          <Select w-19 v-model="$i18n.locale" :options="$i18n.availableLocales">

          </Select>
          <UserAvatar />
        </div>

      </template>
    </Menubar>
  </div>


</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/modules/security/store/user-store";
import { siteStore } from "@/common/site/siteStore";

import UserAvatar from "./components/UserAvatar.vue";
import Select from "primevue/select";
const { t, locale } = useI18n();


const router = useRouter();


const itemsManagement = [
  {
    label: "Management",
    i18n: "management",


    items: [],
  },
  {
    label: "Reports",
    i18n: "reports",


    items: [],
    command: () => router.push('incompatibility-leadership')
  },
];

const itemsAnalyst = [
  {
    label: " ",
    i18n: "test",
    command: () => router.push("/test"),
  },
  {
    label: " ",
    i18n: "results",
    command: () => router.push("/results"),
  },
];

const itemsAdmin = [

  {
    label: " ",
    i18n: "users",
    command: () => router.push("/users"),
  },
  {
    label: " ",
    i18n: "groups",
    command: () => router.push("/groups"),
  },
  {
    label: " ",
    i18n: "functional_roles",
    command: () => router.push("/functional-roles"),
  },
];

const itemsSuperAdmin = [
  {
    label: " ",
    i18n: "client",
    command: () => router.push("/clients"),
  },
]
const itemsDefault = [

  {
    label: " ",
    i18n: "test",

    items: [
      {
        label: " ",
        i18n: "execute",
        command: () => router.push("/select-test"),
      },
      {
        label: " ",
        i18n: "results",
        command: () => router.push("/my-results"),
      },
    ]
  },
  {
    label: " ",
    i18n: "functional_roles",
    command: () => router.push("/functional-roles-selection"),
  },
  {
    label: " ",
    i18n: "compatibility",
    command: () => router.push("/compatibility-selection"),
  },

  {
    label: " ",
    i18n: "info",

    command: () => router.push("/info"),
  },
];
const items = ref([]);
let subItemsManagement = []
if (userStore().getRoles.includes("Admin") || userStore().getRoles.includes("Client")) {
  subItemsManagement.push(...itemsAdmin)
}
if (userStore().getRoles.includes("Analyst")) {
  subItemsManagement.push(...itemsAnalyst)
}
if (userStore().getRoles.includes("Super Admin")) {
  subItemsManagement.push(...itemsAdmin)
  subItemsManagement.push(...itemsAnalyst)

  subItemsManagement.push(...itemsSuperAdmin)
}


if (subItemsManagement.length > 0) {
  itemsManagement[0].items.push(...subItemsManagement);
  items.value.push(...itemsManagement)
}
if (userStore().getRoles.includes("Executor")) {
  items.value.push(...itemsDefault);
}


const updateNavbarLabels = () => {
  items.value.forEach((item: any) => {
    if (item.label) {
      item.label = t(`navbar.${item.i18n}.name`);
    }
    if (item.items) {
      item.items.forEach((subItem: any) => {
        subItem.label = t(`navbar.${item.i18n}.${subItem.i18n}`);
      });
    }
  });
};

updateNavbarLabels();

watch(locale, () => {
  updateNavbarLabels();
});

const goHome = () => {
  router.push("/");
};
</script>
<style>
.navbar {
  z-index: 4;
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  top: 0;
  left: 0;
  list-style: none;
  background-color: transparent;
  backdrop-filter: blur(0.5rem);
}

.home .p-menubar {
  background-color: transparent !important;
}
</style>
<i18n lang="json">{
  "es": {
    "navbar": {
      "management": {
        "functional_roles": {
          "name": "Roles Funcionales"
        },
        "compatibility": {
          "name": "Selección de Equipo y Liderazgo",
        }
      },
      "reports": {
        "name": "Reportes"
      },
      "functional_roles": {
        "name": "Roles Funcionales"
      },
      "compatibility": {
        "name": "Selección de Equipo y Liderazgo",
      }
    }
  },
  "en": {
    "navbar": {
      "management": {
        "functional_roles": {
          "name": "Functional Roles"
        },
        "compatibility": {
          "name": "Team Compatibility and Leadership Assessment"
        }
      },
      "reports": {
        "name": "Reports"
      },
      "functional_roles": {
        "name": "Functional Roles"
      },
      "compatibility": {
        "name": "Team Compatibility and Leadership Assessment"
      }
    }
  }
}</i18n>
