
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ places, image, date }) {
  return (
    <>
      <PostTitle>{places} {date}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={places + date} url={image} />
      </div>

    </>
  )
}
