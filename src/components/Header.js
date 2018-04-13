import React from 'react';

const Header = (props) => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">{props.title} from {props.location}</h1>
      <h2 className="todays-date">{Date()}</h2>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
    </div>
  </div>
);

Header.defaultProps = {
  title: 'NewReactApp',
  location: 'NapTown'
};

export default Header;
