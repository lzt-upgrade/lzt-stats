import { getTimestamp } from "../utils.ts"
import Thread from "../base/thread.js"
import Profile from "../base/profile.js"
import Chat from "../base/chat.js"
import Conversation from "../base/conversation.js"
import { saveStats } from "../storage.js"
import { getHTMLFromString, findYouInEl } from "../data/parser.js"

export default class {
  static init() {
    // reference: https://github.com/LOLZHelper/LOLZHelperReborn/blob/main/src/common/hooks.js
    const XF_AJAX = XenForo.ajax

    XenForo.ajax = function () {
      console.debug("[LZTStats.AjaxHook]", arguments)
      const url = arguments[0]
      const data = arguments[1]

      const timestamp = getTimestamp()
      switch (true) {
        case Thread.isMessage(url): {
          const threadId = Thread.getThreadId(url)
          saveStats(
            {
              id: threadId,
              timestamp,
            },
            "stats-messages",
          )
          break
        }
        case Thread.isComment(url): {
          const postId = Thread.getPostId(url)
          saveStats(
            {
              id: postId,
              timestamp,
            },
            "stats-comments",
          )
          break
        }
        case Thread.isParticipate(url): {
          const threadId = Thread.getThreadId(url)
          saveStats(
            {
              id: threadId,
              timestamp,
            },
            "stats-participates",
          )
          break
        }
        case Thread.isReport(url): {
          const postId = Thread.getPostId(url)
          saveStats(
            {
              id: postId,
              // message: data?.[1] || '', // weighs a lot
              timestamp,
            },
            "stats-reports",
          )
          break
        }
        case Thread.isCreate(url): {
          const forumId = Thread.getForumId(url)
          saveStats(
            {
              id: forumId,
              timestamp,
            },
            "stats-threads-created",
          )
          break
        }
        case Thread.isEdit(url): {
          const threadId = Thread.getThreadId(url)
          saveStats(
            {
              id: threadId,
              timestamp,
            },
            "stats-threads-edited",
          )
          break
        }
        case Thread.isDelete(url): {
          const threadId = Thread.getThreadId(url)
          saveStats(
            {
              id: threadId,
              timestamp,
            },
            "stats-threads-deleted",
          )
          break
        }
        case Thread.isDeleteComment(url) && data.length > 0: {
          const postId = Thread.getCommentPostId(url)
          saveStats(
            {
              id: postId,
              timestamp,
            },
            "stats-comments-deleted",
          )
          break
        }
        case Thread.isDeleteMessage(url) && data.length > 0: {
          // ! Do not switch places with comments or you will have to fix the regex
          const postId = Thread.getPostId(url)
          saveStats(
            {
              id: postId,
              timestamp,
            },
            "stats-messages-deleted",
          )
          break
        }
        case Thread.isEditComment(url): {
          const postId = Thread.getCommentPostId(url)
          saveStats(
            {
              id: postId,
              timestamp,
            },
            "stats-comments-edited",
          )
          break
        }
        case Thread.isEditMessage(url): {
          // ! Do not switch places with comments or you will have to fix the regex
          const postId = Thread.getPostId(url)
          saveStats(
            {
              id: postId,
              timestamp,
            },
            "stats-messages-edited",
          )
          break
        }
        case (Thread.isPollVote(url) || Profile.isPollVote(url)) &&
          data.length > 0: {
          const id = Thread.isPollVote(url)
            ? Thread.getThreadId(url)
            : Profile.getPostId(url)
          saveStats(
            {
              id: id,
              timestamp,
            },
            "stats-polls",
          )
          break
        }
        case Profile.isMessageByUserId(url) ||
          (Profile.isMessageByShortLink(url) &&
            window.location.pathname.replace("/", "") + "/post" === url): {
          // Check by ID, if the user has a tag, then check so that the path matches the name in the link
          const userId = Profile.getUserId(url) // it can also return the tag
          saveStats(
            {
              id: userId,
              timestamp,
            },
            "stats-messages",
          )
          break
        }
        case Profile.isComment(url): {
          const postId = Thread.getCommentPostId(url)
          saveStats(
            {
              id: postId,
              timestamp,
            },
            "stats-comments",
          )
          break
        }
        case Chat.isMessage(url): {
          saveStats(
            {
              id: 0,
              message: data?.message,
              timestamp,
            },
            "stats-chat",
          )
          break
        }
        case Chat.isEditMessage(url): {
          const chatId = Chat.getChatId(url)
          saveStats(
            {
              id: chatId,
              timestamp,
            },
            "stats-chat-edited",
          )
          break
        }
        case Chat.isDeleteMessage(url): {
          const chatId = Chat.getChatId(url)
          saveStats(
            {
              id: chatId,
              timestamp,
            },
            "stats-chat-deleted",
          )
          break
        }
        case Conversation.isMessage(url): {
          const conversationId = Conversation.getConversationId(url)
          saveStats(
            {
              id: conversationId,
              timestamp,
            },
            "stats-conversation",
          )
          break
        }
        case Conversation.isEditMessage(url): {
          const conversationId = Conversation.getConversationId(url)
          saveStats(
            {
              id: conversationId,
              timestamp,
            },
            "stats-conversation-edited",
          )
          break
        }
        default:
          break
      }

      const ajaxRes = XF_AJAX.apply(this, arguments)
      ajaxRes.then(res => {
        switch (true) {
          case Thread.isSympathyOrLike(url): {
            const postId = Thread.getPostIdByFullURL(url)
            const parsedHTML = getHTMLFromString(res.templateHtml)
            const likeCountLeftEl = parsedHTML.querySelector(".likeCountLeft") // if not null is sympathies else likes
            const likeTextEl = parsedHTML.querySelector(".likeText")
            if (likeTextEl && findYouInEl(likeTextEl)) {
              saveStats(
                {
                  id: postId,
                  timestamp,
                },
                likeCountLeftEl ? "stats-sympathies-new" : "stats-likes",
              )
            }

            break
          }
          case Profile.isLike(url): {
            const postId = Thread.getPostIdByFullURL(url)
            const parsedHTML = getHTMLFromString(res.templateHtml)
            const likeTextEl = parsedHTML.querySelector(".likeText")
            if (likeTextEl && findYouInEl(likeTextEl)) {
              saveStats(
                {
                  id: postId,
                  timestamp,
                },
                "stats-likes",
              )
            }

            break
          }
          default:
            break
        }
      })

      return ajaxRes
    }
  }
}
