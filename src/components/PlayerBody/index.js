import React, { useRef } from 'react';
import Slick from 'react-slick';
import style from './playerBodyStyle.module.scss';

const PlayerBody = (props) => {

    const slickConfig = {
        className: style.carousel,
        centerMode: true,
        infinite: true,
        centerPadding: "70px",
        slidesToShow: 1,
        speed: 500,
        onSwipe: (e) => {
            props.swipeHandler(slickRef, e, 'touch');
        }
    };

    const slickRef = useRef(null);
    const arrayRef = useRef(props.tracksListData);
    const decimalZero = props.tracksListData[0].length % 60 <= 9 ? '0' : '';

    const soundWaveData = [];

    for (let i = 0; i < 72; i++) {
        soundWaveData.push(Math.floor(Math.random() * 17) + 13);
    }


    return (
        <div className={style.mainBodyComponent}>
            <div className={style.content}>
                <Slick ref={slickRef} {...slickConfig}>
                    {arrayRef.current.map(track => (
                        <div key={`imageCoverKey_${track.id}`} className={style.imageWrapper}>
                            <img src={track.cover} alt={track.title} />
                        </div>
                    ))}
                </Slick>
            </div>
            <div className={style.songData}>
                <div className={style.name}>{props.tracksListData[0].title}</div>
                <div className={style.artist}>{props.tracksListData[0].artist}</div>
            </div>
            <div className={style.playerControls}>
                <div className={style.buttonsGroup}>
                    <button className={`${style.shuffleButton} ${style.controlButton}`}>Shuffle</button>
                    <button onClick={props.swipeHandler.bind(this, slickRef, 'right', 'click')} className={`${style.prevButton} ${style.controlButton}`}>Previous</button>
                    <button onClick={props.togglePlayHandler} className={`${style.playButton} ${props.playState && style.active}`}>Play</button>
                    <button onClick={props.swipeHandler.bind(this, slickRef, 'left', 'click')} className={`${style.nextButton} ${style.controlButton}`}>Next</button>
                    <button className={`${style.loopButton} ${style.controlButton}`}>Loop</button>
                </div>
                <div className={style.timeBar}>
                    <span className={style.time}>0:00</span>
                    <span className={style.progressBar} />
                    <span className={style.time}>
                        {`${Math.floor(props.tracksListData[0].length / 60)}:${decimalZero}${props.tracksListData[0].length % 60}`}
                    </span>
                </div>
            </div>
            <div className={style.soundWave}>
                {soundWaveData.map(soundBar => (
                    <span className={style.soundBar} style={{ height: `${soundBar}px` }} />
                ))}
            </div>
        </div>
    )
}

export default PlayerBody;