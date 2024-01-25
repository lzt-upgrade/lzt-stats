export default class {
  static isMessage = url => /^threads\/([^d]+)\/add-reply$/.test(url)
  static isComment = url => /^posts\/([^d]+)\/comment$/.test(url)
  static isDeleteMessage = url => /^posts\/([^d]+)\/delete$/.test(url)
  static isDeleteComment = url => /^posts\/comments\/([^d]+)\/delete$/.test(url)
  static isEditMessage = url => /^posts\/([^d]+)\/save-inline$/.test(url)
  static isEditComment = url =>
    /^posts\/comments\/([^d]+)\/save-inline$/.test(url)
  static isParticipate = url => /^threads\/([^d]+)\/participate/.test(url) // ! DON'T ADD ANYTHING TO THE END!! THERE'S A CAPTCHA GOING ON
  static isSympathyOrLike = url => /\/posts\/([^d]+)\/like$/.test(url)
  static isReport = url => /^posts\/([^d]+)\/report$/.test(url)
  static isPollVote = url => /^threads\/([^d]+)\/poll\/vote/.test(url)
  static isCreate = url => /^forums\/([-\w]+)\/add-thread$/.test(url)
  static isEdit = url => /^threads\/([^d]+)\/save$/.test(url)
  static isDelete = url => /^threads\/([^d]+)\/delete$/.test(url)

  static getThreadId(url) {
    const threadId = url.match(/^threads\/([^d]+)\//)?.[1]?.split("/")?.[0]
    return Number(threadId) || 0
  }

  static getPostId(url) {
    // !!! не путать с Profile.getPostId
    const postId = url.match(/^posts\/([^d]+)\//)?.[1]?.split("/")?.[0]
    return Number(postId) || 0
  }

  static getPostIdByFullURL(url) {
    const postId = url.match(/\/posts\/([^d]+)\//)?.[1]?.split("/")?.[0]
    return Number(postId) || 0
  }

  static getCommentPostId(url) {
    const postId = url
      .match(/^posts\/comments\/([^d]+)\//)?.[1]
      ?.split("/")?.[0]
    return Number(postId) || 0
  }

  static getForumId(url) {
    const forumId = url.match(/^forums\/([-\w]+)\//)?.[1]?.split("/")?.[0]
    return String(forumId) || 0
  }
}
