import { useEffect } from 'react';
import styled from 'styled-components';
import { useState, useSelector } from 'react';
import { Link } from 'react-router-dom';
import AddSuit from '../dashboard/AddSuit';



const Banner = ({image}) => {

  const [showModal, setShowModal] = useState(false);

  const StyledDiv = styled.div`
    background-image: url(${image});
    background-color: #366eb466 !important;
    background-size: cover;  
    background-repeat: no-repeat;
    height: 400px;
    margin-bottom: 20px;
  `;

    return (
      <div>
          <StyledDiv>
            <div className="banner__overlay">
              <div className="content__wrapper">
                <div className="banner__side banner__side--left">
                  <span className="banner__title">Case Manager</span>
                  <span className="banner__description">We also choose soccer. This is why we've created a platform where our users and other like-minded people can connect with other players, coaches, agents and loyal fans using our smart search tool. Our goal is to unite both beginning and professional soccer players as well as encourage them to register and engage on the platform by sharing skills and achievements with their followers and fans, creating a network unlike any before. Invite your friends to join you on the platform, expand your network and enjoy limitless communication.</span>
                  <AddSuit />
                </div>
              </div>
            </div>            
          </StyledDiv>            
      </div>
  );
}

export default Banner;