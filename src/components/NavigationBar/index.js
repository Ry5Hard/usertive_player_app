import React from 'react';
import style from './navigationStyle.module.scss';

const NavigationBar = (props) => {

    return (
        <div className={style.upperBar}>
            <button onClick={props.backButtonHandler} className={style.backButton}>
                Back
            </button>
            {(!props.songListState && !props.songInfoState) && (
                <span className={style.albumInfo}>
                    <div className={style.albumLabel}>ALBUM</div>
                    <div className={style.albumName}>{props.currentTrackAlbum}</div>
                </span>
            )}
            {!props.songListState && (
                <button onClick={props.toggleSongInfoHandler} className={style.songInfoButton}>
                    Song Info
                </button>
            )}
        </div>
    )
}

export default NavigationBar;