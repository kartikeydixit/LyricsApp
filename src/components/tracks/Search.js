import React, {Component} from 'react';
import {Consumer} from '../../context'

class Search extends Component{
  state = {
    trackTitle: ''
  }
  findTrack = (dispatch , e)=>{
      e.preventDefault();

      fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&country=in&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(r => r.json())
      .then(data=>{
        // data.message.body.track_list[]
        dispatch({
            type:'SEARCH_TRACKS',
            payload:data.message.body.track_list
        })
      })
      .catch(err => console.log(err))
   }
  
  onChange = (event)=> {
    this.setState({
        trackTitle:event.target.value
    })
  }

  render(){
    return(
      <Consumer>
          {value=>{
            //   console.log(value);
            const {dispatch} = value
              return (
                  <div className="card card-body mb-4 p-4">
                      <h1 className="display-4 text-center">
                          <i className="fas fa-music">      Search For A Song</i>
                      </h1>
                      <p className="lead text-center">Get the lyrics for any song</p>
                      <form onSubmit={this.findTrack.bind(this,dispatch)}>
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Song title" name="trackTitle" value={this.state.trackTitle}
                            onChange={this.onChange}
                            />
                          </div>
                          <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Get Track Lyrics</button>
                      </form>
                  </div>
              )
          }}
      </Consumer>
    )
 }
}

export default Search