export function saveStats(stats, valueName) {
  console.debug("[LZTStats.saveStats]", stats)
  let oldData = GM_getValue(valueName, [])

  oldData.push(stats)

  GM_setValue(valueName, oldData)
}
