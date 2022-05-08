import GenreList from '../components/GenreList'
import GenreFilter from '../components/GenreFilter'

const Home = ({genres, getBookOnClick, setGenre, user}) => {

    return (
        <>
            <style type="text/css">
                {`
                    .filter-container {
                        display: flex;
                        margin: 1rem;
                        padding:1rem;
                        align-items: center
                    }

                    .filter-container * {
                        padding-right:0.5rem;
                    }
                `}
            </style>

            <div className="filter-container">
                <h1>Books</h1>
                <GenreFilter genres={genres} setGenre={setGenre}/>
            </div>
            <GenreList user={user}  genres={genres} getBookOnClick={getBookOnClick} />
        </>
    )
}

export default Home;
