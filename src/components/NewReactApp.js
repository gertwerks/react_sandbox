import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';
import Pictures from './Pictures';
import SingleNumber from './SingleNumber';

export default class NewReactApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
    pictures: [],
    singleNumber: undefined,
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  };

  getNumber = () => {
    fetch('https://randomuser.me/api/?results=1')
      .then(results => {
        return results.json();
      }).then(data => {
        let number = data.results[0].cell;
        console.log('number', number);
        this.setState(() => ({
          singleNumber: number,
        }));
      })
  };

  componentDidMount() {

    //run fo sho
    this.getNumber();

    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      debugger;
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    const subtitle = 'Ladies and Gentlemen Render Your Components';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className='picture-container'>
          {this.state.pictures}
        </div>
        <div className="container">

          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
          <Pictures />
          <SingleNumber
            singleNumber={this.state.singleNumber}
          />
        </div>

        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}
