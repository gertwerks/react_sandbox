import React from 'react';

export default class Pictures extends React.Component {

  constructor() {
    super();
    this.state = {
      pictures: [],
    }
    this.grabPics();
  }

 
  grabPics = () => {
    fetch('https://randomuser.me/api/?results=24')
    .then(results => {
      this.set
      return results.json();
    }).then(data => {
      console.log('results', data.results);
      let pictures = data.results.map((pic) => {
        return (
          <div key={pic.cell} className='picture-dot'>
            <img src={pic.picture.medium} />
            <span>{pic.cell}</span>
          </div>
        )
      })
      this.setState({pictures: pictures});
      console.log("state", this.state.pictures);
    })
  };

  render() {
    return (
      <div className='picture-container'>
      {this.state.pictures}
     </div>
    )
  }
}