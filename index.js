import { tweetsData } from "./data.js"

const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")


tweetBtn.addEventListener("click", function() {
    console.log(tweetInput.value)
})

document.addEventListener("click", function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } 
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    } 
    else if (e.target.dataset.replies) {
        handleReplyClick(e.target.dataset.reply)
    }
})

function handleLikeClick(tweetId) {
    let targetTweetObj = tweetsData.filter( function (tweet) {
        return tweet.uuid === tweetId
    })[0] /* [0] megadja a tömbön belüli első tagot így objektumot kapunk vissza */

    if (!targetTweetObj.isLiked) {
        targetTweetObj.likes++
    } else {
        targetTweetObj.likes--
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render() 
}
/* handleLikeClick 
    tweetsData.forEach( function (tweet) {
        const targetTweetObj = tweet
            if (targetTweetObj.uuid === tweetId) {
                targetTweetObj.likes += 1
            }                
       })
*/

function handleRetweetClick(tweetId) {
    let targetTweetObj = tweetsData.filter( function (tweet) {
        return tweet.uuid === tweetId
    })[0]

    if (!targetTweetObj.isRetweeted) {
        targetTweetObj.retweets++
    } else {
        targetTweetObj.retweets--
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId){
    const targetReplyObj = tweetsData.filter(function(tweet) {
    return tweet.uuid === replyId
    })[0]
    console.log(targetReplyObj)
}


function getFeedHTML() {
    let feedHTML = ""
    tweetsData.forEach( function(tweet) {
        let isLikedClass = ""
        let isRetweetedClass = ""
        let repliesHTML = ""

        if (tweet.isLiked) {
            isLikedClass = "liked"
        } 
        if (tweet.isRetweeted) {
            isRetweetedClass = "retweeted"
        }

        if (tweet.replies.length > 0) {
            tweet.replies.forEach( function (reply) {
                repliesHTML += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                     </div>
                </div>`
            })
        }

        feedHTML += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
            <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${isLikedClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${isRetweetedClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
            </div>            
            </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHTML}
                </div>  
        </div>`
    })
    return feedHTML
}
getFeedHTML()


function render() {
    document.getElementById("feed").innerHTML = getFeedHTML() 
}
render()