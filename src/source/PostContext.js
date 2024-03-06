import React, { createContext, useContext, useState, useEffect } from 'react'
import { getData } from 'util/api'
const PostContext = createContext()

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize] = useState(10)
	const [totalPages, setTotalPages] = useState(null)
	const [viewMode, setViewMode] = useState(() => {
		return localStorage.getItem('viewMode') || 'list'
	})
	const baseURL = process.env.REACT_APP_API_URL

	useEffect(() => {
		const fetchDataAndUpdateState = async () => {
			try {
				const { data, totalPages } = await getData(
					currentPage,
					pageSize,
					baseURL
				)
				setTotalPages(totalPages)
				setPosts(data)
			} catch (error) {
				console.error('Error fetching posts:', error.message)
			}
		}

		fetchDataAndUpdateState()
	}, [baseURL, currentPage, pageSize])

	const handlePageChange = newPage => {
		setCurrentPage(newPage)
	}

	const toggleViewMode = () => {
		setViewMode(prevMode => {
			const newMode = prevMode === 'list' ? 'table' : 'list'
			localStorage.setItem('viewMode', newMode)
			return newMode
		})
	}

	return (
		<PostContext.Provider
			value={{
				posts,
				currentPage,
				totalPages,
				handlePageChange,
				viewMode,
				toggleViewMode,
			}}
		>
			{children}
		</PostContext.Provider>
	)
}

export const usePostContext = () => useContext(PostContext)
