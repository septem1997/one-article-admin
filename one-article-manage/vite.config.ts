import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        vueJsx(),
        Pages({
            pagesDir: [
                { dir: 'src/pages', baseRoute: '' },
                { dir: 'src/features/admin/pages', baseRoute: 'admin' },
            ],
            extensions: ['vue', 'md'],
            syncIndex: false,
            replaceSquareBrackets: true,
            nuxtStyle: true,
        })]
})
