
import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';




document.addEventListener('click', function (e) {

    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === "tweet-btn") {
        handleTweetBtn()
    }
})

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

    renderFeed(tweetsData)
}
function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    renderFeed(tweetsData)
}
function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}
function handleTweetBtn() {
    const tweetInput = document.getElementById('tweet-input')
    if (tweetInput.value) {
        tweetsData.unshift(
            {
                handle: `@scrimba 💎`,
                profilePic: `images/scrimbalogo.png`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            }
        )
        renderFeed(tweetsData)
        tweetInput.value = ''
    }


}

function getHtmlFeed(tweets) {
    let htmlFeed = ``
    tweets.forEach(tweet => {

        let likeClassIcon = ''
        let retweetClassIcon = ''
        if (tweet.isLiked) {
            likeClassIcon = 'liked'
        }
        if (tweet.isRetweeted) {
            retweetClassIcon = 'retweeted'
        }
        let repliesHtml = ``
        if (tweet.replies.length > 0) {

            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                  
 <div class="tweet-reply">
     <div class="tweet-inner">
              <img src="${reply.profilePic}" class="profile-pic" >
            
        <div>
          <p class="handle">${reply.handle}</p>
         <p class="tweet-text">${reply.tweetText}</p>
         </div>
     </div>
  </div>
                `
            })
        }

        htmlFeed += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class=" profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeClassIcon}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetClassIcon}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
<div class="hidden" id="replies-${tweet.uuid}"> 
   ${repliesHtml}
</div>
    `
    });
    return htmlFeed
}


function renderFeed(tweets) {
    document.getElementById('feed').innerHTML = getHtmlFeed(tweets)
}
renderFeed(tweetsData)