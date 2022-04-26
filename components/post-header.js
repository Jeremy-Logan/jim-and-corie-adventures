
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ places, image, year }) {
  return (
    <>
      <PostTitle>{places} {year}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage places={places} year={year} url={image} />
      </div>

    </>
  )
}
