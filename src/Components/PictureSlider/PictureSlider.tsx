import { Swiper, SwiperSlide } from "swiper/react";
import s from "./PictureSlider.module.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import SlideContent from "./SlideContent";

const PictureSlider = () => {
    const slidUrl = [
        "https://i.ibb.co/2khLVSX/13-22.webp",
        "https://i.ibb.co/q9q5KT3/banner.webp",
        "https://i.ibb.co/qnKNB1D/7-25.webp",
        "https://i.ibb.co/jRjDSp6/10-22.webp",
    ];
    const slides = slidUrl.map((url) => (
        <SwiperSlide key={url}>
            <SlideContent url={url} />
        </SwiperSlide>
    ));

    return (
        <div className="sliderWrapper">
            <Swiper
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
                centeredSlides
                className="mySwiper"
            >
                {slides}
            </Swiper>
        </div>
    );
};

export default PictureSlider;
