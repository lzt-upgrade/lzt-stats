export default class {
  static isLike = url => /\/profile-posts\/([^d]+)\/like$/.test(url)
  static isMessageByUserId = url => /^members\/([^d]+)\/post$/.test(url)
  static isMessageByShortLink = url => /^([-\w]+)\/post$/.test(url)
  static isComment = url => /^profile-posts\/([^d]+)\/comment$/.test(url)
  static isPollVote = url => /^profile-posts\/([^d]+)\/poll\/vote/.test(url)

  static getPostId(url) {
    // !!! не путать с Thread.getPostId
    const postId = url.match(/^profile-posts\/([^d]+)\//)?.[1]?.split("/")?.[0]
    return Number(postId) || 0
  }

  static getUserId(url) {
    const matched =
      url.match(/^([-\w]+)\/post$/) || url.match(/^members\/([^d]+)\//)
    const userId = matched?.[1]?.split("/")?.[0]
    return String(userId) || 0
  }
}
