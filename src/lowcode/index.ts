// 将外部的lowcode资源文件转换为内部可用的

import sandbox from './sandbox'

export default async function lowcode () {
  const lowcodeJS = await fetch('./lowcode/index.js').then(res => {
    return res.text()
  })
  const res = sandbox(lowcodeJS, {
    useCookContext: () => {
      return {
        getLib: () => {
          return 'lib'
        }
      }
    }
  })
  return res
}
