import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    build: {
        transpile: ['vuetify']
    },
    devtools: { enabled: true },
    pages: true,
    modules: [
        '@pinia/nuxt',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }))
            })
        }
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls
            }
        }
    }
})
