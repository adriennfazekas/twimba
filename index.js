import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

/* const tweetBtn = document.getElementById("tweet-btn") */

/* refactorálással egy eseménykezelőt kapunk
    tweetBtn.addEventListener("click", function() {
    console.log(tweetInput.value)
    })
*/

document.addEventListener("click", function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } 
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    } 
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    else if (e.target.id === "tweet-btn") { /* mivel itt elérjük a gomb elemet nem kell külön a const tweetBtn */
        handleTweetBtnClick()
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
    const replyEl = document.getElementById(`replies-${replyId}`)
    replyEl.classList.toggle("hidden")
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById("tweet-input")
    
    if (!tweetInput.value.length == "" ) {
        let newTweet = {
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        }
        tweetsData.unshift(newTweet)
        render()  
        tweetInput.value = "" 
    }
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