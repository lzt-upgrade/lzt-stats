import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

import webpack from "webpack"
import { UserscriptPlugin } from "webpack-userscript"
import ESLintPlugin from "eslint-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import preprocess from "svelte-preprocess"

const dev = process.env.NODE_ENV === "development"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const availabledLangs = fs
  .readdirSync(path.resolve(__dirname, "src", "i18n"))
  .filter(f => !f.endsWith(".ts"))

function getHeaders(lang) {
  const headersPath = path.resolve(
    __dirname,
    "src",
    lang ? `i18n/${lang}` : "data",
    "headers.json",
  )
  return JSON.parse(fs.readFileSync(headersPath).toString())
}

console.log("development mode: ", dev)

export default env => {
  const build_type = env.build_type
  console.log("build type: ", build_type)

  function get_filename() {
    let name = "lzt-stats"

    if (build_type === "minify") {
      name += "-min"
    }

    return name + ".js"
  }

  return {
    mode: dev ? "development" : "production",
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".svelte"],
      mainFields: ["svelte", "browser", "module", "main"],
      conditionNames: ["svelte", "browser", "import"],
    },
    performance: {
      hints: "error",
      maxEntrypointSize: 2000 * 10 ** 3,
      maxAssetSize: 2000 * 10 ** 3,
    },
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: get_filename(),
      publicPath: "/",
    },
    devServer: {
      server: "http",
      port: 11946,
      allowedHosts: "all",
      hot: true,
      liveReload: false,
      magicHtml: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      client: false,
    },
    plugins: [
      new webpack.DefinePlugin({
        DEV_MODE: JSON.stringify(dev),
        availabledLangs: JSON.stringify(availabledLangs),
      }),
      new ESLintPlugin(),
      new MiniCssExtractPlugin(),
      new UserscriptPlugin({
        headers: async () => {
          const headers = getHeaders()

          let version = headers.version
          let name = headers.name
          if (dev) {
            headers["name"] = `[DEV] ${name}`
            headers["version"] = `${version}-build.[buildNo]`
          }

          return headers
        },
        i18n: {
          ...(() => {
            const localedHeaders = {}
            for (const file of availabledLangs) {
              localedHeaders[file.substring(0, 2)] = {
                description: getHeaders(file).description,
              }
            }

            return localedHeaders
          })(),
        },
        proxyScript: {
          filename: "[basename].proxy.user.js",
          baseURL: "http://localhost:11946/",
        },
        strict: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(html|svelte)$/,
          use: {
            loader: "svelte-loader",
            options: {
              preprocess: preprocess(),
            },
          },
        },
        {
          // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false, // necessary if you use url('/path/to/some/asset.png|jpg|gif')
              },
            },
          ],
        },
        {
          test: /\.([cm]?ts|tsx)$/,
          loader: "ts-loader",
        },
      ],
    },
    optimization: {
      emitOnErrors: true,
      moduleIds: build_type === "minify" ? "deterministic" : "named",
      minimize: build_type === "minify",
    },
  }
}
