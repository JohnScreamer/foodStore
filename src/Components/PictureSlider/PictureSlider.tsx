import { Swiper, SwiperSlide } from "swiper/react";
import s from "./PictureSlider.module.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import SlideContent from "./SlideContent";
import { useAppSelector } from "../../Hooks/common";

const PictureSlider = () => {
    const { discountList, isLoading } = useAppSelector((state) => state.goods);

    const slides = discountList?.map((slide) => (
        <SwiperSlide key={slide.id}>
            <SlideContent url={slide.img} id={slide.id} />
        </SwiperSlide>
    ));

    return (
        <>
            {isLoading ? (
                <div className={s.loadingBlock}>

                </div>
            ) : (
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
            )}
        </>
    );
};

export default PictureSlider;
