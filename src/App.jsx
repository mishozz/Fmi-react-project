import React, {useState, useEffect} from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './components/Register'
import librarySdk from './services/librarySdk'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookPanel from './components/BookPanel'
import UserBookList from './components/UserBookList'
import GenrePanel from './components/GenrePanel'
import AdminPanel from './components/AdminPanel'

export const App = () => {
    const [genre, setGenre] = useState([]);
    const [genres, setGenres] = useState([]);
    const [book, setBook] = useState({}); 
    const [user, setUser] = useState();
    const [userBooks, setUserBooks] = useState([]);

    const  mainContainerStyle =  {
      position:'relative',
    }

    const getBookOnClick = (book) => {
      setBook(book);
    };

    useEffect(() => {
        const fetchGenres = async () => {
          const genresRes = await librarySdk.fetchGenres();
          setGenres(genresRes.genres)
        };

        const fetchUserBooks = async () => {
          const currentUser = localStorage.getItem('user')
          if(currentUser === "undefined") return;
          try {
            const res = await librarySdk.fetchUserBooks();
            setUserBooks(res.takenBooks);
          } catch(e) {
            console.log(e)
          }
        };

        let currentUser = localStorage.getItem('user')
        if (currentUser !== "undefined" ) {
          currentUser = JSON.parse(currentUser);
          setUser(currentUser);
        } 

        fetchGenres();
        fetchUserBooks();
    }, []);

    const refreshAuthToken = async () => {
      if(!user) {
        return;
      }

      try {
        await librarySdk.refreshToken();
        setTimeout(() => {
          refreshAuthToken();
        }, (900*1000) - 3000);  // 3 seconds before token expires  

      } catch (e) {
        console.log(e)
      } 
    }

    useEffect(() => {
      localStorage.setItem('user', JSON.stringify(user));
      refreshAuthToken();
    }, [user])


    return (
        <div style={mainContainerStyle}>
          <Router>
            <Navbar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/" element={<Home genres={genres} user={user} getBookOnClick={getBookOnClick} setGenre={setGenre}/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/book/:isbn" element={<BookPanel 
                  book={book} 
                  user={user}
                  setUser={setUser}
                  setUserBooks={setUserBooks}
                  getBookOnClick={getBookOnClick} 
                  genres={genres}
                  setBook={setBook}/> } />
              <Route path="/mybooks" element={<UserBookList books={userBooks} setBooks={setUserBooks} user={user} setUser={setUser}/> }/>
              <Route path="/genre/:name" element={<GenrePanel genreName={genre.name} getBookOnClick={getBookOnClick} />} />
              <Route path="/admin" element={<AdminPanel genres={genres} setGenres={setGenres} />} />
            </Routes>
          </Router>
        </div>
    )
}

export default App;
