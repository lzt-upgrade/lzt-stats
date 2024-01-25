export default class {
  static isMessage = url => /^conversations\/([^d]+)\/insert-reply$/.test(url)
  static isEditMessage = url =>
    /^conversations\/([^d]+)\/save-message/.test(url) // ! DON'T ADD ANYTHING TO THE END!! THERE GOES THE MESSAGE NUMBER

  static getConversationId(conversationURL) {
    const conversationId = conversationURL
      .match(/^conversations\/([^d]+)\//)?.[1]
      ?.split("/")?.[0]
    return Number(conversationId) || 0
  }
}
