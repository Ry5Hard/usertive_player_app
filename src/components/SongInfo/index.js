import React from 'react';
import style from './songInfoStyle.module.scss';

const SongInfo = (props) => {

    return (
        <div className={`${style.songInfoContainer} ${props.songInfoState && style.visible}`}>
            <div className={style.imageWrapper}>
                <img src={props.currentTrack.cover} alt={props.currentTrack.title} />
            </div>
            <div className={style.title}>{props.currentTrack.title}</div>
            <div className={style.artist}>{props.currentTrack.artist}</div>
            <div className={style.separator} />
            <div className={style.buttonsGroup}>
                <button>Add to playlist</button>
                <button>Show album</button>
                <button>Share with friends</button>
            </div>
        </div>
    )
}

export default SongInfo;