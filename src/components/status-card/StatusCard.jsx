import React from "react";
import { Link } from "react-router-dom";

import "./statuscard.css";

const StatusCard = (props) => {
  return (
    <Link className='status-card' to={props.link}>
      <div className='status-card__icon'>
        <i className={props.icon}></i>
      </div>
      <div className='status-card__info'>
        <h4>{props.count}</h4>
        <span>{props.title}</span>
      </div>
    </Link>
  );
};

export default StatusCard;
