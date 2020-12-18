import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Tweet from "./Tweet";

const ENDPOINT = "http://127.0.0.1:3003";
const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const socket = socketIOClient(ENDPOINT);
  useEffect(() => {
    socket.on("tweet", (json) => {
      if (json.data) {
        setTweets((oldTweets) => [json, ...oldTweets]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pauseStream = () => {
    socket.off("tweet");
  };
  const resumeStream = () => {
    socket.on("tweet", (json) => {
      if (json.data) {
        setTweets((tweets) => [json, ...tweets]);
      }
    });
  };

  return (
    <>
      <button onClick={pauseStream}>Pause</button>
      <button onClick={resumeStream}>Resume</button>
      <div className="tweetsContainer">
        {tweets.map((tweet, i) => {
          let returnItem = null;
          if (i < 10)
            returnItem = <Tweet key={tweet.data.id} data={tweet}></Tweet>;
          return returnItem;
        })}
        {/* <Tweet></Tweet> */}
      </div>
    </>
  );
};

export default Tweets;
