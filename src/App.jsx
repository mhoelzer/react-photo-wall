import React, { Component } from 'react';
import './App.css';

// This URL can be combined with an photo id to fetch an photo.
// 200 is the image width when paired with another number (200/1000 = 200w/1000h); makes square image
const PHOTO_URL = "https://picsum.photos/200?photo="; // img tag src img 
// This URL can be used to get an array of objects that contain information about various photos.
const PHOTO_LIST_URL = "https://picsum.photos/list"; // first inside fetch 

class App extends Component {
  // 1. Declare a state object that will be used to track an array of photos
  state = {
    photos: [], // if empty no err but just maps an emtpy thing; if not arr, err
    renderCount: 0 // how many images rendered to component
  };

  // 2. Declare a life cycle method. This life cycle method should:
  // - will be called after the component is initially rendered
  // - will fetch an array of photos
  // - will add that array of photos to state once received
  componentDidMount() { // dont use fat arrow here or render b/c not binding anything (react is smart enough to know has to use that instance); does auto; lifecycle; give data about photos and app; loaded on page and ready to go
    fetch(PHOTO_LIST_URL)
      .then(response => response.json())
      .then(bunchaPhotos => {
        this.setState({
          photos: bunchaPhotos, 
          renderCount: 10
        });
        console.log(bunchaPhotos);
      })
      .catch(err => console.log(`${err} error error error`))
  };
  handleLoadMoreImages = evt => { //handle event need handle; insidde class, autobinds w/ this to that method and no other this; shorthand of eventhandler/constructor (dont need cause new feature of synatx classes); handles stuff faster  and easier; bound to dom which is stupid and associated w/ something diff; handle methods go on dom but too stupid
            // constructor(props){this.handleMethod = this.handleMethod.bind(this); this.state = {photos; [], renderCount: 0}} 
              // the state part above has inital state and is faster and will do same code 
    this.setState(prevState => ({
      // updates value in state and causes rerender; if do dom, getelementbyid with css; do in react
      renderCount: prevState.renderCount + 10 
    }))
  }
  render() {
    const {photos = []} = this.state;
    return (
      <React.Fragment>
        <header>
          <h1>Photo Wall</h1>
        </header>
        <div className="collage">
            {/* We use map here because Array.prototype.map is an expression, and for loops are not. You'll learn more about this soon! */}
                      {/* changing all instrances of photo (here and in url) makes the photos different; same with adding a ? or ?random= between phto_url and photo.id. why? is it cause fo the weird url and it's like wtf do i do? */}
            {photos.slice(0, this.state.renderCount).map(photo => // do specific stuff; this many images
              // rbowser load particular image
                <img alt={/* 3. Fill me in with the photo's filename */ photo.filename}
                     key={/* 4. Fill me in with the photo's id */ photo.id}
                     src={/* 5. Fill me in with the photo's URL */ `${PHOTO_URL}${photo.id}`}
                />
            )}
            <br/>
            <button onClick={this.handleLoadMoreImages}>more img</button> 
            {/* inside handlefunction is setestate; conditional render; if not, it's null; react puts thsi button right on dom */}
        </div>
      </React.Fragment>
    );
  }
}

export default App;