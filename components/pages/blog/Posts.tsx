import Image from 'next/image'
import Link from 'next/link'

import { format } from 'date-fns'

import getCategoriesString from '../../../utils/getCategoriesString'

const Posts = ({ posts, count }: { posts: PostType[]; count: number }) => {
  return (
    <div className='flex flex-col items-center'>
      {count === 0 ? (
        <div>There are not posts that match your query</div>
      ) : (
        posts.map((post) => {
          const categories = getCategoriesString(post.category[0].ref)
          return (
            <a
              key={post._id}
              className=' cursor-pointer w-full sm:max-w-[45.125rem] inline-block mb-4 xxs:mb-6 '
            >
              <Link href={`/post/${post._id}`}>
                <div className='bg-secondary-light hover:bg-secondary-lighter p-2  xs:p-4 sm:flex sm:max-w-[45.125rem] items-center '>
                  <div className='basis-[50%] order-2 sm:ml-4 lg:ml-8'>
                    <p className='capitalize font-medium sm:text-lg'>
                      {format(new Date(post.createdAt), 'd MMMM y')} /{' '}
                      {categories}
                    </p>
                    <h2 className='font-bold text-3xl my-2 xxs:my-3 xs:text-4xl '>
                      {post.title}
                    </h2>
                    <p className='font-semibold sm:text-lg'>{`By ${post.created_by.firstname} ${post.created_by.lastname}`}</p>
                    <p className='text-sm mt-4 mb-4 sm:mb-0 sm:mt-5 sm:text-base verticle-ellipsis-three'>
                      {post.description}
                    </p>
                  </div>
                  <div className='max-w-[16.25rem] xs:max-w-sm sm:max-w-none  flex-grow'>
                    <div className='relative pt-[85%]'>
                      <Image
                        src={
                          post?.cover?.formats?.large?.url ||
                          '/static/images/placeholder-alt.svg'
                        }
                        alt={post.alt}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </a>
          )
        })
      )}
    </div>
  )
}

export default Posts
