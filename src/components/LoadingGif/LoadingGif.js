import React from 'react';
import bacon from '../../loadingGifs/bacon-running.gif';
import bears from '../../loadingGifs/bears-running.gif';
import connie from '../../loadingGifs/connie-running.gif';
import gingerbreadGirl from '../../loadingGifs/gingerbread-girl-running.gif';
import goku from '../../loadingGifs/goku-running.gif';
import pikachu from '../../loadingGifs/pikachu-running.gif';
import roadrunner from '../../loadingGifs/roadrunner-running.gif';
import sonic from '../../loadingGifs/sonic-running.gif';
import spongeBob from '../../loadingGifs/spongebob-running.gif';
import './LoadingGif.css';

const LoadingGif = () => {
  const gifs = [bacon, bears, connie, gingerbreadGirl,
    goku, pikachu, roadrunner, sonic, spongeBob
  ];
  const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
  return (
    <div className='LoadingGif'>
      <h1>Loading...</h1>
      <img src={randomGif} alt='loading gif' />
    </div>
  );
};

export default LoadingGif;