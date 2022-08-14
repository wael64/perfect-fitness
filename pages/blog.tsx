import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useClickOutside } from '@mantine/hooks'
import Head from 'next/head'

import { Radio, RadioGroup, Pagination, TextInput } from '@mantine/core'
import Posts from '../components/pages/blog/Posts'

import Link from 'next/link'

import { useRouter } from 'next/router'

import SvgSearch from '../public/static/icons/SvgSearch'

interface BlogProps {
  posts: PostType[]
  page: number
  count: number
  category: string
  searchQuery: string
}

const Blog = ({ posts, page, count, category, searchQuery }: BlogProps) => {
  function getQuery(state: 'current' | 'new'): string {
    let queryArr: string[] = []
    if (searchQuery && state === 'current') {
      queryArr.push(`searchQuery=${searchQuery}`)
    }
    if (category && state === 'current') {
      queryArr.push(`category=${category}`)
    }
    if (searchInput && state === 'new') {
      queryArr.push(`searchQuery=${searchInput}`)
    }
    if (currentCategory && state === 'new') {
      queryArr.push(`category=${currentCategory}`)
    }
    return `/blog?${queryArr.join('&')}`
  }

  // handle the search input's category dropdown
  const [opened, setOpened] = useState(false)
  const ref = useClickOutside(() => setOpened(false))

  const [searchInput, setSearchInput] = useState(searchQuery)

  const [currentCategory, setCurrentCategory] = useState(category)

  const router = useRouter()

  useEffect(() => {
    setCurrentCategory(category)
    setSearchInput(searchQuery)
  }, [category, searchQuery])

  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <section className='mt-4 '>
        <div
          ref={ref}
          className='relative xs:w-[20.75rem] sm:w-[28.25rem] mx-4 xs:mx-auto'
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              router.push(getQuery('new'))
            }}
          >
            <TextInput
              placeholder='Search'
              defaultValue={searchQuery}
              rightSection={
                <SvgSearch
                  className='h-6 w-6 cursor-pointer'
                  onClick={() => router.push(getQuery('new'))}
                />
              }
              onClick={() => setOpened(true)}
              value={searchInput}
              onChange={(event) => setSearchInput(event.currentTarget.value)}
              classNames={{
                root: ' mb-2 ',
                input:
                  'bg-white text-secondary-dark font-medium h-auto py-1 sm:py-2 text-lg border-[1px] border-white focus:border-white rounded-none focus:border-[1px] active:border-[1px] placeholder:text-neutral-500 cursor-text',
              }}
            />
          </form>
          {opened && (
            <RadioGroup
              value={currentCategory}
              onChange={setCurrentCategory}
              color='secondary'
              classNames={{
                label: 'ml-[0.4rem]',
                root: 'absolute bg-white p-3 w-full ',
              }}
            >
              <Radio value='' label='All' />
              <Radio value='nutrition' label='Nutrition' />
              <Radio value='cardio' label='Cardio' />
              <Radio value='strength' label='Strength Training' />
            </RadioGroup>
          )}
        </div>
        <div className=' px-4 xs:px-6 lg:px-0 '>
          <div className='flex flex-wrap justify-center items-center whitespace-nowrap gap-2 mx-auto font-medium mt-4 mb-6 xs:mt-5 xs:mb-8 xxs:gap-3 xs:text-lg sm:mt-7 sm:mb-10 md:mt-9 md:mb-12'>
            <Link href='/blog'>
              <a
                className={`px-2 py-1 sm:px-4 sm:py-[0.4rem] leading-none ${
                  category
                    ? 'bg-secondary-light'
                    : 'bg-white text-secondary-dark'
                }`}
              >
                Latest
              </a>
            </Link>
            <Link href='/blog?category=nutrition'>
              <a
                className={`px-2 py-1 sm:px-4 sm:py-[0.4rem] leading-none ${
                  category !== 'nutrition'
                    ? 'bg-secondary-light'
                    : 'bg-white text-secondary-dark'
                }`}
              >
                Nutrition
              </a>
            </Link>
            <Link href='/blog?category=cardio'>
              <a
                className={`px-2 py-1 sm:px-4 sm:py-[0.4rem] leading-none ${
                  category !== 'cardio'
                    ? 'bg-secondary-light'
                    : 'bg-white text-secondary-dark'
                }`}
              >
                Cardio
              </a>
            </Link>
            <Link href='blog?category=strength'>
              <a
                className={`px-2 py-1 sm:px-4 sm:py-[0.4rem] leading-none ${
                  category !== 'strength'
                    ? 'bg-secondary-light'
                    : 'bg-white text-secondary-dark'
                }`}
              >
                Strength Training
              </a>
            </Link>
          </div>
          <Posts posts={posts} count={count} />
          {count <= 5 ? null : (
            <div className='my-4 sm:my-6 md:my-8  flex justify-center'>
              <Pagination
                total={Math.ceil(count / 5)}
                boundaries={1}
                siblings={0}
                size='md'
                page={page}
                onChange={(e) => {
                  router.push(`${getQuery('current')}&page=${e}`)
                }}
                classNames={{
                  active: 'bg-secondary-light',
                  item: 'border-secondary-light text-white',
                }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { page, category, searchQuery },
}) => {
  let query = ''
  if (page) {
    query += `page=${page}&`
  }
  if (category) {
    query += `category=${category}&`
  }
  let postsRes
  if (searchQuery) {
    query += `searchQuery=${searchQuery}`
    postsRes = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/posts/search?${
        query ? `${query}` : ''
      }`
    )
  } else {
    postsRes = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/posts/get-post-previews?${
        query ? `${query}` : ''
      }`
    )
  }
  const postsData = await postsRes.json()

  return {
    props: {
      posts: postsData.posts || [],
      page: page || 1,
      count: postsData.count || 0,
      category: category || '',
      searchQuery: searchQuery || '',
    },
  }
}

export default Blog
