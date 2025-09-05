import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules"; // ✅ added Autoplay

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators";
//testimonial component
export default function Testimonial() {
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);
  let dispatch = useDispatch();

  let [showPerPage, setShowPerPage] = useState(3);

  let options = {
    effect: "coverflow",
    slidesPerView: showPerPage,
    spaceBetween: 50,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000, // 3 seconds auto-scroll
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    modules: [EffectCoverflow, Pagination, Autoplay], // added Autoplay here
    className: "mySwiper",
  };

  function handelWindoResize() {
    if (window.innerWidth < 768) setShowPerPage(1);
    else setShowPerPage(3);
  }
  window.addEventListener("resize", handelWindoResize);

  useEffect(() => {
    dispatch(getTestimonial());
  }, [TestimonialStateData.length]);

  return (
    <>
      <section id="testimonials" className="testimonials section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>
            What they are saying about us
            <br />
          </p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <Swiper {...options}>
            {TestimonialStateData.filter((x) => x.active).map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="testimonial-item">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p className="slider-message">{item.message}</p>
                    <div className="profile mt-auto">
                      <img
                        src={item.pic || "/assets/img/nouser.webp"}
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
}
