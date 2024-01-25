import defaultPhrases from "./ru_RU/general.json"
import { getTimestamp } from "../utils"

export default new (class {
  private langs: string[] = availabledLangs
  private maxLifeTime: number = 3600 * 60 * 24 // 1 day
  private phrases: object = {}
  private repoLink: string =
    "https://raw.githubusercontent.com/lzt-upgrade/lzt-stats"

  keys = () => this.langs

  async update(lang: string): Promise<boolean> {
    if (
      !this.langs.includes(lang) &&
      (await GM_getValue("menu-lang")) === lang &&
      (await GM_getValue("menu-phrases-timestamp", 0)) + this.maxLifeTime <
        getTimestamp()
    ) {
      return false
    }

    return await fetch(`${this.repoLink}/master/src/i18n/${lang}/general.json`)
      .then(res => {
        if (res.status !== 200) {
          throw res.status
        }

        return res.json()
      })
      .then(async (localeJSON: any) => {
        await GM_setValue("menu-phrases", localeJSON)
        await GM_setValue("menu-lang", lang)
        await GM_setValue("menu-phrases-timestamp", getTimestamp())

        this.phrases = localeJSON
        return true
      })
      .catch(async err => {
        console.error("[LZTStats.i18n.update] Failed to get phrases", err)
        XenForo.alert(`[LZT Stats] Failed to get phrases: ${err}`, "", 5000)
        this.phrases = GM_getValue("menu-phrases", {})
        return false
      })
  }

  getFromLocale(locale: object, phrase: string) {
    // split used for tabs.tab1 and etc
    const result = phrase.split(".").reduce((locale: any, phrase: string) => {
      if (typeof locale === "object" && locale) {
        return locale[phrase]
      }

      return undefined
    }, locale)

    if (result === undefined) {
      console.warn(
        `[LZTStats.i18n.getFromLocale] locale ${JSON.stringify(locale)} doesn't contain phrase ${phrase}`,
      )
    }

    return result
  }

  get(phrase: string): string {
    return (
      this.getFromLocale(this.phrases, phrase) ??
      this.getFromLocale(defaultPhrases, phrase) ??
      phrase
    )
  }
})()
