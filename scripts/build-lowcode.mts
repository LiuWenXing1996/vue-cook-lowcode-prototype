import { context, type Plugin } from 'esbuild'
import { fileURLToPath, URL } from 'node:url'
import dayjs from 'dayjs'

const log = (msg: string) => {
  console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}]:${msg}`)
}

let WatchPlugin: Plugin = {
  name: 'example',
  setup (build) {
    build.onStart(() => {
      log('build started')
      log('building ...')
    })
    build.onEnd(() => {
      log('build ended')
    })
  }
}

let ctx = await context({
  entryPoints: [fileURLToPath(new URL('../lowcode/index.ts', import.meta.url))],
  bundle: true,
  outfile: fileURLToPath(new URL('../public/lowcode/index.js', import.meta.url)),
  target: ['es2015'],
  format: 'cjs',
  sourcemap: "inline",
  plugins: [WatchPlugin]
})

await ctx.watch()

log('watching...')
