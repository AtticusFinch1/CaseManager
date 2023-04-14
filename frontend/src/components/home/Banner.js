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
                  <span className="banner__description">Welcome to our Test Case Manager! Our application is designed to help you manage your testing process efficiently and effectively. With our powerful tools and intuitive interface, you can easily create, organize, and execute test cases to ensure that your software meets the highest standards of quality. Whether you're a developer, tester, or quality assurance professional, our Test Case Manager is the perfect solution to streamline your testing process and deliver high-quality software on time and on budget.</span>
                  <AddSuit />
                </div>
              </div>
            </div>            
          </StyledDiv>            
      </div>
  );
}

export default Banner;