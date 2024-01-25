declare const availabledLangs: string[]
declare function GM_setValue(name: string, value: any): any
declare function GM_getValue(name: string, defaultValue?: any): any

declare module XenForo {
  function alert(
    text?: string,
    title?: string,
    lifetime?: number,
  ): object | string
}
