import React, { useState, useEffect, useRef } from 'react'
import { useFetchPopularMoviesQuery } from 'features/apiSlice'
import Card from 'components/Card/Card'
import style from './movieList.module.css'

const MovieCopy = () => {
  const [page, setPage] = useState(50)
  const [minMaxPage, setMinMaxPage] = useState([50, 50])
  const movieWrapperRef = useRef(null)
  const [movies, setMovies] = useState([])

  const { data, error, isFetching } = useFetchPopularMoviesQuery(page)

  useEffect(() => {
    if (data) {
      if (data.page < minMaxPage[0]) {
        setMinMaxPage([data.page, minMaxPage[1]])
        setMovies([...data.results, ...movies])
      } else {
        setMinMaxPage([minMaxPage[0], data.page])
        setMovies([...movies, ...data.results])
      }
    }
  }, [data])

  useEffect(() => {
    const handleScroll = () => {
      const { current } = movieWrapperRef
      if (current) {
        if (
          current.scrollTop + current.clientHeight >=
          current.scrollHeight - 50
        ) {
          loadMovies(1)
        } else if (current.scrollTop === 0) {
          loadMovies(-1)
        }
      }
    }

    const { current } = movieWrapperRef
    if (current) {
      current.addEventListener('scroll', handleScroll)
      return () => {
        current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [minMaxPage, isFetching])

  const loadMovies = (increment) => {
    if (!isFetching) {
      console.log(minMaxPage)
            setPage(increment > 0 ? minMaxPage[1] + 1 : minMaxPage[0] - 1)
    }
  }

  return (
    <div className={style['movie_list']}>
      <h2 className={style['title']}>Movies Copy</h2>
      <div className={style['movie_wrapper']} ref={movieWrapperRef}>
        <div className={style.list_cards}>
          {error && <p>Error: {error.message}</p>}
          {movies.map((movie, i) => (
            <Card key={i} movie={movie} />
          ))}
          {isFetching && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  )
}

export default MovieCopy

// import React, { useState, useEffect, useRef } from 'react'
// import { useFetchPopularMoviesQuery } from 'features/apiSlice'
// import Card from 'components/Card/Card'
// import style from './movieList.module.css'

// const MovieCopy = () => {
//   const [page, setPage] = useState(50)
//   const movieWrapperRef = useRef(null)
//   const [movies, setMovies] = useState([])

//   const {
//     data,
//     error,
//     isLoading: loading,
//     isFetching,
//   } = useFetchPopularMoviesQuery({ page })

//   useEffect(() => {
//     if (data) {
//       setMovies(prevMovies => [...prevMovies, ...data.results])
//     }
//   }, [data])

//     const loadMoreMovies = () => {
//       if (!isFetching) {
//         setPage(prevPage => prevPage + 1)
//       }
//     }

//     const loadPreMovies = () => {
//       if (!isFetching) {
//         setPage(prevPage => prevPage - 1)
//       }
//     }

//   const handleScroll = () => {
//     const { current } = movieWrapperRef
//     if (current) {
//       if (
//         current.scrollTop + current.clientHeight >=
//         current.scrollHeight - 50
//       ) {
//         loadMoreMovies()
//       }
//       else if (current.scrollTop === 0) {
//         loadPreMovies()
//       }
//     }
//   }
//   useEffect(() => {
//     const { current } = movieWrapperRef
//     if (current) {
//       current.addEventListener('scroll', handleScroll)
//       return () => {
//         current.removeEventListener('scroll', handleScroll)
//       }
//     }
//   }, [])

//   return (
//     <div className={style['movie_list']}>
//       <h2 className={style['title']}>Movies Copy</h2>
//       <div className={style['movie_wrapper']} ref={movieWrapperRef}>
//         <div className={style.list_cards}>
//           {loading && <p>Loading...</p>}
//           {error && <p>Error: {error.message}</p>}
//           {movies.map((movie, i) => (
//             <Card key={i} movie={movie} />
//           ))}
//           {isFetching && <p>Loading more...</p>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MovieCopy

// import React, { useState, useEffect, useRef } from 'react'
// import { useFetchPopularMoviesQuery } from 'features/apiSlice'
// import Card from 'components/Card/Card'
// import style from './movieList.module.css'

// const MovieCopy = () => {
//   const [page, setPage] = useState(50)
//   const movieWrapperRef = useRef(null)
//   const [movies, setMovies] = useState([])

//   const {
//     data,
//     error,
//     isLoading: loading,
//     isFetching,
//   } = useFetchPopularMoviesQuery({ page })

// useEffect(() => {
//   if (data) {
//     setMovies(prevMovies => [...prevMovies, ...data.results])
//   }
// }, [data])

//   const handleScroll = () => {
//     const { current } = movieWrapperRef
//     if (current) {
//       if (
//         current.scrollTop + current.clientHeight >=
//         current.scrollHeight - 50
//       ) {
//         loadMoreMovies()
//       }
//     }
//   }

//   const loadMoreMovies = () => {
//     if (!isFetching) {
//       setPage(prevPage => prevPage + 1)
//     }
//   }

//   useEffect(() => {
//     const { current } = movieWrapperRef
//     if (current) {
//       current.addEventListener('scroll', handleScroll)
//       return () => {
//         current.removeEventListener('scroll', handleScroll)
//       }
//     }
//   }, [movies])

//   return (
//     <div className={style['movie_list']}>
//       <h2 className={style['title']}>Movies Copy</h2>
//       <div className={style['movie_wrapper']} ref={movieWrapperRef}>
//         <div className={style.list_cards}>
//           {loading && <p>Loading...</p>}
//           {error && <p>Error: {error.message}</p>}
//           {movies.map((movie, i) => (
//             <Card key={i} movie={movie} />
//           ))}
//           {isFetching && <p>Loading more...</p>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MovieCopy

// import React, { useState, useEffect, useRef } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import {fetchPopularMoviesAsync,selectMovieList,setAddFilmsAtStart,} from 'features/movieSlice'
// import { useBoolean, useDebounceCallback } from 'usehooks-ts'
// import Card from 'components/Card/Card'
// import style from './movieList.module.css'

// const MovieCopy = () => {
//   const dispatch = useDispatch()
//   const { list, error, status } = useSelector(selectMovieList)
//   const [filters, setFilters] = useState({ page: 50 })
//   const [firstLoadedPage, setFirstLoadedPage] = useState(50)
//   const [lastLoadedPage, setLastLoadedPage] = useState(50)
//   const movieWrapperRef = useRef(null)
//   const loader = useBoolean(false)

//   useEffect(() => {
//     dispatch(fetchPopularMoviesAsync(filters))
//   }, [dispatch, filters])

//   useEffect(() => {
//     if (status !== 'loading') {
//       loader.setFalse()
//     }
//   }, [status, loader])

// const handleScrollToBottom = () => {
//   loader.setTrue()
//   dispatch(setAddFilmsAtStart(false))

//   if (filters.page !== lastLoadedPage + 1) {
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       page: lastLoadedPage + 1,
//     }))
//   }
// }

// const handleScrollToTop = () => {
//   loader.setTrue()
//   dispatch(setAddFilmsAtStart(true))

//   if (filters.page !== firstLoadedPage - 1) {
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       page: firstLoadedPage - 1,
//     }))
//   }
// }

//   const handleScroll = useDebounceCallback(event => {
//     const { target } = event
//     if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
//       handleScrollToBottom()
//     } else if (target.scrollTop === 0 && firstLoadedPage > 1) {
//       handleScrollToTop()
//     }
//   }, 300)

//   useEffect(() => {
//     if (status === 'succeeded') {
//       if (filters.page < firstLoadedPage) {
//         const addedContentHeight = 1550
//         movieWrapperRef.current.scrollTop = addedContentHeight
//         setFirstLoadedPage(filters.page)
//       } else if (filters.page > lastLoadedPage) {
//         setLastLoadedPage(filters.page)
//       }
//     }
//   }, [filters])

//   return (
//     <div className={style['movie_list']}>
//       <h2 className={style['title']}>Movies Copy</h2>
//       <div
//         className={style['movie_wrapper']}
//         ref={movieWrapperRef}
//         onScroll={handleScroll}
//       >
//         <div className={style.list_cards}>
//           {status === 'failed' && <p>Error: {error.message}</p>}
//           {list.map((movie, i) => (
//             <Card key={i} movie={movie} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MovieCopy
