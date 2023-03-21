import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}, ["win32"]),
    new MakerZIP({}, ["darwin"]),
    // new MakerRpm({}),
    // new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
   publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        authToken: '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',
        repository: {
          owner: 'IvanButov98',
          name: 'test-common'
        },
        prerelease: true
      }
    }
  ]
};

export default config;
