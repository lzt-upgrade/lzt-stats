export default class {
  static isMessage = url => /^\/chatbox\/post-message$/.test(url)
  static isDeleteMessage = url => /^\/chatbox\/([^d]+)\/delete$/.test(url)
  static isEditMessage = url => /^\/chatbox\/([^d]+)\/edit$/.test(url)

  static getChatId(chatURL) {
    const chatId = chatURL.match(/^\/chatbox\/([^d]+)\//)?.[1]?.split("/")?.[0]
    return Number(chatId) || 0
  }
}
