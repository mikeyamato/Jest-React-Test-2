/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

// console.log('**** this',process.env.TMDB_API_KEY)

class MoviesList extends PureComponent {
  state = {
    movies: [],
  };

  async componentDidMount() {
    
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      // console.log('**** that', url)

      const res = await fetch(
        url,
      );
      const movies = await res.json();
      // console.log('movies', movies)
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movies } = this.state;

    if(movies < 1) return <h1 data-testid={'loading'}>loading...</h1>; 
    return (
      <MovieGrid data-testid={'movie-map'}>
        {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
