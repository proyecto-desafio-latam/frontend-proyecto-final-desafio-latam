import "react-multi-carousel/lib/styles.css"
import Carousel from "react-multi-carousel"
import { useNavigate } from "react-router-dom"

const BookCarousel = ({ books, color }) => {


  const navigate = useNavigate()

  return (
    <div className="container mt-5">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 4,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 768,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 768
            },
            items: 3,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {books &&
          books.map((item) => (
            <div key={item.id} className="card card-carousel" >
              <span className={`badge ${color} position-absolute top-0 end-0 zindex-2 mt-3 ms-3`}
              > ${item.price}</span>
              <img className=" img-carousel"
                src="/libroprueba.webp"
                alt=""
                onClick={() =>
                  navigate(`/books/${item.id}`)}
              />
              <div className="content">
                <h5 className="text-center">
                  {item.title}
                </h5>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  )
}

export default BookCarousel