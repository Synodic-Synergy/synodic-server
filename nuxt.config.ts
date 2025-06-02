// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@pinia/nuxt'
  ],
  app: {
    head: {
      title: 'Synodic Synergy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Synodic Synergy - Your school\'s integrated learning management system' 
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },
  css: ['~/assets/css/main.css'],
  vite: {
    server: {
      allowedHosts: [
        'smb.adenmgb.com',
        'localhost',
        '127.0.0.1'
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    adminSetupKey: process.env.ADMIN_SETUP_KEY,
    dataEncryptionKey: process.env.DATA_ENCRYPTION_KEY
  },
  nitro: {
    routeRules: {
      '/': { cors: true },
      '/login': { cors: true },
      '/api/auth/**': { cors: true }
    }
  }
})
