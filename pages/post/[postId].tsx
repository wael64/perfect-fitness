import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'

import Head from 'next/head'

let md = require('markdown-it')()

import fuseData from '../../data/fuseData.json'
import { format } from 'date-fns'

import getCategoriesString from '../../utils/getCategoriesString'

import styles from '../../styles/Post.module.css'

import getPost from '../../utils/get-post'

interface PostProps {
  post: PostType
}
const Post = ({ post }: PostProps) => {
  const categories = getCategoriesString(post.category[0].ref)
  const content = md.render(post.body)
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className='px-4 w-full xs:px-6 sm:px-8 md:px-0 sm:mx-auto sm:max-w-[700px] md:max-w-[800px] mb-8'>
        <div className='mb-10'>
          <p className='capitalize font-medium text-lg md:text-xl'>
            {format(new Date(post.createdAt), 'd MMMM y')} / {categories}
          </p>
          <h1 className='text-5xl sm:text-6xl font-medium mt-2 mb-3 md:text-7xl'>
            {post.title}
          </h1>
          <p className='font-semibold text-lg mb-4 md:text-xl md:mb-5'>{`By ${post.created_by.firstname} ${post.created_by.lastname}`}</p>
          <div className='flex-grow '>
            <div className='relative pt-[65%]'>
              <Image
                src={
                  post?.cover?.formats?.large?.url ||
                  '/static/images/placeholder-alt.svg'
                }
                alt={post.alt || ''}
                layout='fill'
                objectFit='cover'
              />
            </div>
          </div>
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: content }}
          className={styles.content}
        ></section>
      </div>
    </>
  )
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.postId !== 'string') return { props: { post: [] } }

  const post = await getPost(params.postId)

  return {
    props: {
      post: post || [],
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = fuseData.map<{ params: { postId: string } }>((item) => {
      return {
        params: {
          postId: item._id,
        },
      }
    })

    return {
      paths,
      fallback: false,
    }
  } catch (err) {
    console.log('Get paths error', err)
    return { paths: [{ params: { postId: '' } }], fallback: false }
  }
}

export default Post
