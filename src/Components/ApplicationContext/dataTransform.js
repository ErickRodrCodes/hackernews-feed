import fetch from 'node-fetch'

export default function fetchListOfTopStories() {
	const fetchList = async () => {
		try {
			const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
			const json = await res.json()
			return Promise.resolve(json)
		} catch (e) {
			return Promise.reject(e)
		}
	}
	let listOfStories = fetchList()
	return listOfStories
}

export const setListOfInitialStories = (listOfStories) => {
	let initialFetchList, filteredList;
}

export const isStory = (storyId) => {
	return false
}

export {fetchListOfTopStories}