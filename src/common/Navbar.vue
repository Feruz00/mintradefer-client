<template>
  <nav class="px-6 lg:px-14 pt-6">
    <div class="flex items-center justify-between">
      <!-- LEFT SIDE -->
      <div class="flex items-center gap-12">
        <router-link :to="{ name: 'home' }">
          <FlagIcon />
        </router-link>

        <!-- Desktop Links -->
        <div class="hidden lg:flex items-center gap-6">
          <router-link
            v-for="route in routes"
            :key="route.key"
            :to="route.path"
            custom
            v-slot="{ navigate, isActive }"
          >
            <span
              @click="navigate"
              class="text-lg font-medium cursor-pointer transition-colors"
              :class="isActive ? 'text-white' : 'text-gray-300 hover:text-white'"
            >
              {{ route.name }}
            </span>
          </router-link>
        </div>
      </div>

      <!-- RIGHT SIDE (LANGUAGES) -->
      <div class="hidden lg:flex items-center">
        <p
          @click="changeLanguage('tm')"
          class="px-2 text-lg font-medium cursor-pointer border-r border-gray-400"
          :class="locale === 'tm' ? 'text-white' : 'text-gray-400'"
        >
          TKM
        </p>

        <p
          @click="changeLanguage('en')"
          class="px-2 text-lg font-medium cursor-pointer border-r border-gray-400"
          :class="locale === 'en' ? 'text-white' : 'text-gray-400'"
        >
          ENG
        </p>

        <p
          @click="changeLanguage('ru')"
          class="px-2 text-lg font-medium cursor-pointer"
          :class="locale === 'ru' ? 'text-white' : 'text-gray-400'"
        >
          RUS
        </p>
      </div>

      <!-- MOBILE MENU BUTTON -->
      <button class="lg:hidden text-white text-2xl cursor-pointer" @click="drawerOpen = true">
        <MenuOutlined />
      </button>
    </div>

    <!-- MOBILE DRAWER -->
    <a-drawer
      v-model:open="drawerOpen"
      placement="right"
      :closable="false"
      width="300"
      :bodyStyle="{
        backgroundColor: '#4f46e5',
        padding: '24px',
      }"
    >
      <!-- Header -->
      <div class="flex items-center justify-between text-white">
        <FlagIcon />

        <CloseOutlined class="text-xl cursor-pointer" @click="drawerOpen = false" />
      </div>

      <!-- LINKS -->
      <div class="flex flex-col gap-6 mt-10">
        <router-link
          v-for="route in [...routes, ...otherRoutes]"
          :key="route.key"
          :to="route.path"
          custom
          v-slot="{ navigate, isActive }"
        >
          <span
            @click="
              () => {
                navigate()
                drawerOpen = false
              }
            "
            class="text-lg font-medium transition-colors cursor-pointer"
            :class="isActive ? 'text-white' : 'text-indigo-200 hover:text-white'"
          >
            {{ route.name }}
          </span>
        </router-link>
      </div>

      <div class="mt-auto pt-10">
        <div class="bg-indigo-500/40 p-1 rounded-xl flex justify-between gap-1">
          <button
            @click="changeLanguage('tm')"
            class="flex-1 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
            :class="
              locale === 'tm' ? 'bg-white text-indigo-600' : 'text-indigo-100 hover:text-white'
            "
          >
            TKM
          </button>

          <button
            @click="changeLanguage('en')"
            class="flex-1 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
            :class="
              locale === 'en' ? 'bg-white text-indigo-600' : 'text-indigo-100 hover:text-white'
            "
          >
            ENG
          </button>

          <button
            @click="changeLanguage('ru')"
            class="flex-1 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
            :class="
              locale === 'ru' ? 'bg-white text-indigo-600' : 'text-indigo-100 hover:text-white'
            "
          >
            RUS
          </button>
        </div>
      </div>
    </a-drawer>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  MenuOutlined,
  CloseOutlined,
  TrophyOutlined,
  FileTextOutlined,
  FileProtectOutlined,
  GlobalOutlined,
} from '@ant-design/icons-vue'
import FlagIcon from './FlagIcon.vue'

const drawerOpen = ref(false)

const { t, locale } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
}

const routes = computed(() => [
  {
    key: 'main',
    path: { name: 'home' },
    name: t('main'),
  },
  {
    key: 'news',
    path: { name: 'news' },
    name: t('news'),
  },
  {
    key: 'events',
    path: { name: 'events' },
    name: t('events'),
  },
  {
    key: 'enterprises',
    path: { name: 'enterprises' },
    name: t('enterprises'),
  },
  {
    key: 'about',
    path: { name: 'about' },
    name: t('about'),
  },
  {
    key: 'contact',
    path: { name: 'contact' },
    name: t('contact'),
  },
])
const otherRoutes = computed(() => [
  {
    key: 'expo',
    path: { name: 'expo' },
    name: t('expo'),
    icon: TrophyOutlined,
  },
  {
    key: 'tenders',
    path: { name: 'tender' },
    name: t('tenders'),
    icon: FileTextOutlined,
  },
  {
    key: 'official_papers',
    path: { name: 'official-papers' },
    name: t('official_papers'),
    icon: FileProtectOutlined,
  },
  {
    key: 'online_service',
    path: { name: 'online-service' },
    name: t('online_service'),
    icon: GlobalOutlined,
  },
])
</script>
