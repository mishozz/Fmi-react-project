import { useEffect, useState } from 'react'
import axios from 'axios'
import librarySDK from '../services/librarySdk'

export default function useBookSearch(genre, pageNumber, limit) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [genreBooks, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      let cancel;
      try {
        const res = await librarySDK.fetchBooksByGenre(genre, pageNumber, limit,cancel)

        setBooks(prevBooks => [...new Set([...prevBooks, ...res.books])])
        setHasMore(res.totalBooks > pageNumber*limit)
        setLoading(false)
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true)
      }

      return () => cancel();
    }

    fetchData();
  }, [pageNumber])
  
  return { loading, error, genreBooks, hasMore }
}