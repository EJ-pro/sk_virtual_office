// vite.config.mts
import { basename } from "path";
import fs from "fs";
import { defineConfig, loadEnv } from "file:///usr/src/app/play/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///usr/src/app/play/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import { sveltePreprocess } from "file:///usr/src/app/play/node_modules/svelte-preprocess/dist/index.js";
import { sentryVitePlugin } from "file:///usr/src/app/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import Icons from "file:///usr/src/app/node_modules/unplugin-icons/dist/vite.js";
import tsconfigPaths from "file:///usr/src/app/play/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { nodePolyfills } from "file:///usr/src/app/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const config = {
    server: {
      host: "0.0.0.0",
      port: 8080,
      cors: true,
      hmr: {
        // workaround for development in docker
        clientPort: 80
      },
      watch: {
        ignored: ["./src/pusher"]
      }
    },
    build: {
      sourcemap: env.GENERATE_SOURCEMAP !== "false",
      outDir: "./dist/public",
      rollupOptions: {
        plugins: [mediapipe_workaround()]
        // external: ["@mediapipe/tasks-vision"],
        //plugins: [inject({ Buffer: ["buffer/", "Buffer"] })],
      },
      assetsInclude: ["**/*.tflite", "**/*.wasm"]
    },
    plugins: [
      nodePolyfills({
        include: ["events", "buffer"],
        globals: {
          Buffer: true
        }
      }),
      svelte({
        preprocess: sveltePreprocess(),
        onwarn(warning, defaultHandler) {
          if (warning.code === "a11y-click-events-have-key-events") return;
          if (warning.code === "security-anchor-rel-noreferrer") return;
          if (warning.code === "Unknown at rule @container (css)") return;
          if (warning.message.includes("Unknown at rule @container")) return;
          if (defaultHandler) {
            defaultHandler(warning);
          }
        }
      }),
      Icons({
        compiler: "svelte"
      }),
      tsconfigPaths()
    ],
    resolve: {
      alias: {
        events: "events"
      }
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./tests/setup/vitest.setup.ts"],
      coverage: {
        all: true,
        include: ["src/*.ts", "src/**/*.ts"],
        exclude: ["src/i18n", "src/enum"]
      }
    },
    optimizeDeps: {
      include: ["olm"],
      exclude: ["svelte-modals"],
      esbuildOptions: {
        define: {
          global: "globalThis"
        }
      }
    }
  };
  if (env.SENTRY_ORG && env.SENTRY_PROJECT && env.SENTRY_AUTH_TOKEN && env.SENTRY_RELEASE && env.SENTRY_ENVIRONMENT) {
    console.info("Sentry plugin enabled");
    config.plugins.push(
      sentryVitePlugin({
        url: env.SENTRY_URL || "https://sentry.io/",
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        // Specify the directory containing build artifacts
        sourcemaps: {
          assets: "./dist/public/**"
        },
        // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
        // and needs the `project:releases` and `org:read` scopes
        authToken: env.SENTRY_AUTH_TOKEN,
        // Optionally uncomment the line below to override automatic release name detection
        release: {
          name: env.SENTRY_RELEASE,
          deploy: {
            env: env.SENTRY_ENVIRONMENT
          },
          finalize: true
        }
      })
    );
  } else {
    console.info("Sentry plugin disabled");
  }
  return config;
});
function mediapipe_workaround() {
  return {
    name: "mediapipe_workaround",
    load(id) {
      if (basename(id) === "selfie_segmentation.js") {
        let code = fs.readFileSync(id, "utf-8");
        code += "exports.SelfieSegmentation = SelfieSegmentation;";
        return { code };
      } else {
        return null;
      }
    }
  };
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Vzci9zcmMvYXBwL3BsYXlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi91c3Ivc3JjL2FwcC9wbGF5L3ZpdGUuY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vdXNyL3NyYy9hcHAvcGxheS92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyBiYXNlbmFtZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSBcIkBzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGVcIjtcbmltcG9ydCB7IHN2ZWx0ZVByZXByb2Nlc3MgfSBmcm9tIFwic3ZlbHRlLXByZXByb2Nlc3NcIjtcbmltcG9ydCB7IHNlbnRyeVZpdGVQbHVnaW4gfSBmcm9tIFwiQHNlbnRyeS92aXRlLXBsdWdpblwiO1xuaW1wb3J0IEljb25zIGZyb20gXCJ1bnBsdWdpbi1pY29ucy92aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IHsgbm9kZVBvbHlmaWxscyB9IGZyb20gXCJ2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxsc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICAgIC8vIExvYWQgZW52IGZpbGUgYmFzZWQgb24gYG1vZGVgIGluIHRoZSBjdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LlxuICAgIC8vIFNldCB0aGUgdGhpcmQgcGFyYW1ldGVyIHRvICcnIHRvIGxvYWQgYWxsIGVudiByZWdhcmRsZXNzIG9mIHRoZSBgVklURV9gIHByZWZpeC5cbiAgICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgc2VydmVyOiB7XG4gICAgICAgICAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAgICAgICAgIHBvcnQ6IDgwODAsXG4gICAgICAgICAgICBjb3JzOiB0cnVlLFxuICAgICAgICAgICAgaG1yOiB7XG4gICAgICAgICAgICAgICAgLy8gd29ya2Fyb3VuZCBmb3IgZGV2ZWxvcG1lbnQgaW4gZG9ja2VyXG4gICAgICAgICAgICAgICAgY2xpZW50UG9ydDogODAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2F0Y2g6IHtcbiAgICAgICAgICAgICAgICBpZ25vcmVkOiBbXCIuL3NyYy9wdXNoZXJcIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgc291cmNlbWFwOiBlbnYuR0VORVJBVEVfU09VUkNFTUFQICE9PSBcImZhbHNlXCIsXG4gICAgICAgICAgICBvdXREaXI6IFwiLi9kaXN0L3B1YmxpY1wiLFxuICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHBsdWdpbnM6IFttZWRpYXBpcGVfd29ya2Fyb3VuZCgpXSxcbiAgICAgICAgICAgICAgICAvLyBleHRlcm5hbDogW1wiQG1lZGlhcGlwZS90YXNrcy12aXNpb25cIl0sXG4gICAgICAgICAgICAgICAgLy9wbHVnaW5zOiBbaW5qZWN0KHsgQnVmZmVyOiBbXCJidWZmZXIvXCIsIFwiQnVmZmVyXCJdIH0pXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhc3NldHNJbmNsdWRlOiBbXCIqKi8qLnRmbGl0ZVwiLCBcIioqLyoud2FzbVwiXSxcbiAgICAgICAgfSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgbm9kZVBvbHlmaWxscyh7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW1wiZXZlbnRzXCIsIFwiYnVmZmVyXCJdLFxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgQnVmZmVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHN2ZWx0ZSh7XG4gICAgICAgICAgICAgICAgcHJlcHJvY2Vzczogc3ZlbHRlUHJlcHJvY2VzcygpLFxuICAgICAgICAgICAgICAgIG9ud2Fybih3YXJuaW5nLCBkZWZhdWx0SGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCB3YXJuIG9uOlxuICAgICAgICAgICAgICAgICAgICBpZiAod2FybmluZy5jb2RlID09PSBcImExMXktY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50c1wiKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmICh3YXJuaW5nLmNvZGUgPT09IFwic2VjdXJpdHktYW5jaG9yLXJlbC1ub3JlZmVycmVyXCIpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdhcm5pbmcuY29kZSA9PT0gXCJVbmtub3duIGF0IHJ1bGUgQGNvbnRhaW5lciAoY3NzKVwiKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmICh3YXJuaW5nLm1lc3NhZ2UuaW5jbHVkZXMoXCJVbmtub3duIGF0IHJ1bGUgQGNvbnRhaW5lclwiKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBhbGwgb3RoZXIgd2FybmluZ3Mgbm9ybWFsbHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0SGFuZGxlcih3YXJuaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIEljb25zKHtcbiAgICAgICAgICAgICAgICBjb21waWxlcjogXCJzdmVsdGVcIixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdHNjb25maWdQYXRocygpLFxuICAgICAgICBdLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgIGV2ZW50czogXCJldmVudHNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHRlc3Q6IHtcbiAgICAgICAgICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgICAgICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgICAgICAgc2V0dXBGaWxlczogW1wiLi90ZXN0cy9zZXR1cC92aXRlc3Quc2V0dXAudHNcIl0sXG4gICAgICAgICAgICBjb3ZlcmFnZToge1xuICAgICAgICAgICAgICAgIGFsbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXCJzcmMvKi50c1wiLCBcInNyYy8qKi8qLnRzXCJdLFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGU6IFtcInNyYy9pMThuXCIsIFwic3JjL2VudW1cIl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFtcIm9sbVwiXSxcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFtcInN2ZWx0ZS1tb2RhbHNcIl0sXG4gICAgICAgICAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGRlZmluZToge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWw6IFwiZ2xvYmFsVGhpc1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBpZiAoZW52LlNFTlRSWV9PUkcgJiYgZW52LlNFTlRSWV9QUk9KRUNUICYmIGVudi5TRU5UUllfQVVUSF9UT0tFTiAmJiBlbnYuU0VOVFJZX1JFTEVBU0UgJiYgZW52LlNFTlRSWV9FTlZJUk9OTUVOVCkge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJTZW50cnkgcGx1Z2luIGVuYWJsZWRcIik7XG4gICAgICAgIGNvbmZpZy5wbHVnaW5zLnB1c2goXG4gICAgICAgICAgICBzZW50cnlWaXRlUGx1Z2luKHtcbiAgICAgICAgICAgICAgICB1cmw6IGVudi5TRU5UUllfVVJMIHx8IFwiaHR0cHM6Ly9zZW50cnkuaW8vXCIsXG4gICAgICAgICAgICAgICAgb3JnOiBlbnYuU0VOVFJZX09SRyxcbiAgICAgICAgICAgICAgICBwcm9qZWN0OiBlbnYuU0VOVFJZX1BST0pFQ1QsXG4gICAgICAgICAgICAgICAgLy8gU3BlY2lmeSB0aGUgZGlyZWN0b3J5IGNvbnRhaW5pbmcgYnVpbGQgYXJ0aWZhY3RzXG4gICAgICAgICAgICAgICAgc291cmNlbWFwczoge1xuICAgICAgICAgICAgICAgICAgICBhc3NldHM6IFwiLi9kaXN0L3B1YmxpYy8qKlwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gQXV0aCB0b2tlbnMgY2FuIGJlIG9idGFpbmVkIGZyb20gaHR0cHM6Ly9zZW50cnkuaW8vc2V0dGluZ3MvYWNjb3VudC9hcGkvYXV0aC10b2tlbnMvXG4gICAgICAgICAgICAgICAgLy8gYW5kIG5lZWRzIHRoZSBgcHJvamVjdDpyZWxlYXNlc2AgYW5kIGBvcmc6cmVhZGAgc2NvcGVzXG4gICAgICAgICAgICAgICAgYXV0aFRva2VuOiBlbnYuU0VOVFJZX0FVVEhfVE9LRU4sXG4gICAgICAgICAgICAgICAgLy8gT3B0aW9uYWxseSB1bmNvbW1lbnQgdGhlIGxpbmUgYmVsb3cgdG8gb3ZlcnJpZGUgYXV0b21hdGljIHJlbGVhc2UgbmFtZSBkZXRlY3Rpb25cbiAgICAgICAgICAgICAgICByZWxlYXNlOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGVudi5TRU5UUllfUkVMRUFTRSxcbiAgICAgICAgICAgICAgICAgICAgZGVwbG95OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnY6IGVudi5TRU5UUllfRU5WSVJPTk1FTlQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZpbmFsaXplOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIlNlbnRyeSBwbHVnaW4gZGlzYWJsZWRcIik7XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG59KTtcblxuLy8gdXNlIHRvIGZpeCB0aGUgYnVpbGQgaXNzdWUgd2l0aCBtZWRpYXBpcGUgPT0+IGh0dHBzOi8vZ2l0aHViLmNvbS90ZW5zb3JmbG93L3RmanMvaXNzdWVzLzcxNjVcbi8vIFRPRE86IHJlbW92ZSB0aGlzIHdoZW4gd2UgbWlncmF0ZSB0byBtZWRpYXBpcGUvdGFza3MtdmlzaW9uXG5mdW5jdGlvbiBtZWRpYXBpcGVfd29ya2Fyb3VuZCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBcIm1lZGlhcGlwZV93b3JrYXJvdW5kXCIsXG4gICAgICAgIGxvYWQoaWQ6IHN0cmluZykge1xuICAgICAgICAgICAgaWYgKGJhc2VuYW1lKGlkKSA9PT0gXCJzZWxmaWVfc2VnbWVudGF0aW9uLmpzXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29kZSA9IGZzLnJlYWRGaWxlU3luYyhpZCwgXCJ1dGYtOFwiKTtcbiAgICAgICAgICAgICAgICBjb2RlICs9IFwiZXhwb3J0cy5TZWxmaWVTZWdtZW50YXRpb24gPSBTZWxmaWVTZWdtZW50YXRpb247XCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29kZSB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAg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
