import React, { Component } from 'react';
import './App.css';

// This URL can be combined with an photo id to fetch an photo.
const PHOTO_URL = "https://picsum.photos/200?photo="; // img tag src img 
// This URL can be used to get an array of objects that contain information
// about various photos.
const PHOTO_LIST_URL = "https://picsum.photos/list"; // 1 inside fetch 

class App extends Component {
  // 1. Declare a state object that will be used to track an array of photos
  state = {
    photos: [] // if empty no err but just maps an emtpy thing; if not arr, err
  };

  // 2. Declare a life cycle method
  // This life cycle method should:
  // - will be called after the component is initially rendered
  // - will fetch an array of photos
  // - will add that array of photos to state once received
  componentDidMount() {
    fetch(PHOTO_LIST_URL)
      .then(response => response.json())
      .then(bunchaPhotos => {
        this.setState({photos: bunchaPhotos});
        console.log(bunchaPhotos);
      })
      .catch(err => console.log(`${err} error error error`))
  };
  render() {
    const {photos = []} = this.state;
    return (
      <React.Fragment>
        <header>
          <h1>Photo Wall</h1>
          <p>
            Start by reading App.jsx and completing the numbered steps.
            Afterward, delete this paragraph. Then, open up App.css and
            complete the instructions there.
          </p>
        </header>
        <div className="collage">
            {/* We use map here because Array.prototype.map is an expression,
              * and for loops are not. You'll learn more about this soon! 
              */}
            {photos.map(photo => 
                <img alt={/* 3. Fill me in with the photo's filename */ photo.filename}
                     key={/* 4. Fill me in with the photo's id */ photo.id}
                     src={/* 5. Fill me in with the photo's URL */ `${PHOTO_URL}${photo.id}`}
                />
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
