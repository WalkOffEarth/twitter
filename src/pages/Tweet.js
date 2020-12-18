import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const Tweet = (props) => {
  const { data } = props;
  const { id } = data.data;
  const options = {
    cards: "hidden",
    align: "center",
    width: "550",
    conversation: "none",
  };
  return (
    <div className="tweetContainer">
      <div className="image">{data.includes.users[0].profile_image_url}</div>
      <div className="tweet">
        <div className="message">{data.data.text}</div>
        <div className="tweetUser">{data.includes.users[0].name}</div>
        <div className="tweetTime"></div>
      </div>
    </div>
    // <div className="tweetContainer">
    //   <div className="image">images</div>
    //   <div className="tweet">
    //     <div className="message">'text'</div>
    //     <div className="footer">
    //       <div className="tweetUser">'name'</div>
    //       <div className="tweetTime">'time'</div>
    //     </div>
    //   </div>
    // </div>
    // <TwitterTweetEmbed options={options} tweetId={id} />
  );
};

export default Tweet;
