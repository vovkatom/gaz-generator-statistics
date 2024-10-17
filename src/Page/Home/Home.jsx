import React from 'react';
import { HomeBox, HomeDescr, HomeImg } from './Home.styled';
import FonGenerator from '../../img/generator.png';

const Home = () => {
  return (
    <HomeBox>
      <HomeImg src={FonGenerator} alt='img'/>
      <HomeDescr>
        Час роботи Газ - Бензин ГЕНЕРАТОРА:
        <a target='blank' href='https://github.com/Vovkatom'>
          <span style={{ color: 'blue' }}>Володимир Богачук</span>
        </a>
      </HomeDescr>
    </HomeBox>
  );
};

export default Home;
