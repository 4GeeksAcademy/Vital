import React from "react";
import Postcard_1 from "./postcard_1";
import Postcard_2 from "./postcard_2";
import Postcard_3 from "./postcard_3";
import Postcard_4 from "./postcard_4";
import Postcard_5 from "./postcard_5";
import Postcard_6 from "./postcard_6";

const Carousel = () => {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="d-flex justify-content-evenly flex-wrap pb-5">
            <Postcard_1  name="Chris Bumstead" description="“It’s hard to stick with any workout routine when you don’t find it enjoyable, but that certainly isn’t the case with vital routines. I love the mental challenges of it as well as the physical fitness benefits. I’m so grateful to have discovered this fun and rewarding app to stay in shape.” "/>
            <Postcard_2 name="Henry cavill" description=" “I had hit a wall with my weight training and just felt stuck. Then I decided to try this exercises and two months later was amazed by the results I had gotten. Losing fat, gaining muscle, and feeling stronger has been a fantastic feeling that I didn’t even realize was possible.”"/>
          </div>
        </div>
        <div className="carousel-item">
          <div className="d-flex justify-content-evenly flex-wrap pb-5">
            <Postcard_3 name="Elena Gómez" description=" “I’d always been an active person, but I wasn’t able to stick with any specific training plan for very long. That is, until I took a vital routine. The intensity  helped make pushing past my limits a regular thing and now I’m feeling stronger and more energetic than ever.”" />
            <Postcard_4 name="Larry wheels" description="“Since I started powerlifting two years ago, the changes I’ve had to my physical, mental, and emotional health have been profound. Not only have I lost weight and gained muscle, I’ve also strengthened my mental toughness and have become more confident. All of that has helped me take on challenges in life with more ease than I used to.”"/>
          </div>
        </div>
        <div className="carousel-item">
          <div className="d-flex justify-content-evenly flex-wrap pb-5">
            <Postcard_5  name="Chris hemsworth" description="“As a parent, it can be hard to fit exercise into your life. But I fought hard to make it happen. Now I feel like I’m setting a good example for my daughter and it’s been an amazing transformation to feel strong, vibrant, and have more energy to be an involved mom.”"/>
            <Postcard_6  name="Arnold Schwarzenegger" description=" “My main goal in exercising was to fit into my clothes better. But the benefits have gone way beyond that. I’ve seen an improvement in my mental health, better sleep, and a more balanced lifestyle overall. Those secondary benefits have made my journey into a better level of physical fitness even more worth it”"/>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <i
          className="fa-solid fa-angle-left fs-2"
          style={{ color: "#ff5300" }}
        ></i>
        {/* <span className="carousel-control-prev-icon" aria-hidden="true" /> */}
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <i
          className="fa-solid fa-angle-right fs-2"
          style={{ color: "#ff5300" }}
        ></i>
        {/* <span className="carousel-control-next-icon" aria-hidden="true" /> */}
        <span className="visually-hidden">Next</span>
      </button>
    </div >
  );
};

export default Carousel;
