import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import img1 from '../../images/banner1.jpg';
import {Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SingleSuit = ({ param }) => {
    const suit = useSelector(state => state.suits.suits);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [slidesPerView, setSlidesPerView] = useState(1)
    useEffect(()=>{
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize)
        return () => {
            window.removeEventListener("resize", handleWindowResize)
        };
    },[])
    useEffect(()=>{
        if (windowWidth > 1300){
            setSlidesPerView(4)
        } else if (windowWidth > 720) {
            setSlidesPerView(3)
        } else {
            setSlidesPerView(2);
        }
    },[windowWidth]);
    return (
        <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
        <section className="post">
            <div className="container posts__container">
                {
                    param?.map((item) => (
                        <SwiperSlide key={item?.id} >
                            <Link to={`suit/${item?.id}`} style={{zIndex:1000, opacity: 0.8}}>                         
                                <div className='rounded-lg p-6 shadow-sm bg-[#f3faff] border-solid border-2 border-indigo-300'>
                                    <div className="overflow-hidden rounded-lg">
                                        <img
                                        className="w-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-110 rounded-lg h-40"
                                        src={img1}
                                        />
                                    </div>
                                    <h3 className="pt-5 text-[14px] font-normal text-gray-600 block">
                                        {item.name}
                                    </h3>
                                    <p className="font-normal text-gray-500 cursor-pointer text-lg duration-300 transition hover:text-[#FA5252] mt-2">
                                        {item.description}
                                    </p>
                                </div>                         
                            </Link>  
                        </SwiperSlide>     
                    ))
                }                         
                                                                     
            </div>
        </section>
        </Swiper>
    )
}

export default SingleSuit