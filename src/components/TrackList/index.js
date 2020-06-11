import React from 'react';
import style from './trackListStyle.module.scss';

const TrackList = (props) => {

    const singleTrack = trackData => {

        const decimalZero = trackData.length % 60 <= 9 ? '0' : '';

        return (
            <div className={style.trackLine}>
                <span className={style.title}>{trackData.title}</span>
                <span className={style.dottedLine} />
                <span className={style.time}>
                    {`${Math.floor(trackData.length / 60)}:${decimalZero}${trackData.length % 60}`}
                </span>
            </div>
        )
    }

    const list = () => {
        const shiftedTrackList = [...props.tracksListData];
        const firstTrack = shiftedTrackList.shift();
        shiftedTrackList.push(firstTrack);

        return (
            <div className={style.trackList}>
                <div className={style.trackListHeader}>
                    <span className={style.songInfo}>
                        <div className={style.title}>{props.tracksListData[0].title}</div>
                        <div className={style.artist}>{props.tracksListData[0].artist}</div>
                    </span>
                    <button onClick={props.togglePlayHandler} className={`${style.playButton} ${props.playState && style.active}`}>Play</button>
                    <div className={style.overlayBackground} />
                </div>
                <ol>
                    {shiftedTrackList.map(track => (
                        <li key={`trackKey_${track.id}`}>
                            {singleTrack(track)}
                        </li>
                    ))}
                </ol>
                <div className={style.bottomBar}>
                    <button className={style.shuffleButton}>Shuffle Play</button>
                    <button onClick={props.hideSongsListHandler} className={style.hideListButton}>Hide List</button>
                </div>
            </div>
        )
    }

    const trackBar = () => (
        <div className={style.trackBar}>
            <button onClick={props.showSongsListHandler} className={style.showTrackListButton}>showTrackList</button>
            <span className={style.nextTrackInfo}>
                <div className={style.label}>NEXT</div>
                {singleTrack(props.tracksListData[1])}
            </span>
        </div>)


    return (
        <div className={`${style.trackListComponent} ${props.songListState && style.listVisible}`}>
            {list()}
            {trackBar()}
        </div>
    )
}

export default TrackList;