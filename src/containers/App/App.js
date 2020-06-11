import React from 'react';
import PlayerBody from '../../components/PlayerBody';
import TrackList from '../../components/TrackList';
import NavigationBar from '../../components/NavigationBar';
import SongInfo from '../../components/SongInfo';
import styled from 'styled-components';
import background from '../../assets/images/bg_image.jpg';
import cover1 from '../../assets/images/covers/unreleased_cover.png';
import cover2 from '../../assets/images/covers/cover.png';
import cover3 from '../../assets/images/covers/cover-1.png';

const AppBodyStyled = styled.div`
    display:block;
    position:relative;
    max-width:640px;
    max-height:100vh;
    overflow:hidden;
    margin:0 auto;
    background: #1f1937;
    text-align:center;
    transform:scale(1);
    padding-top:70px;

    .overflowBackground{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 60%;
        content: '';
        opacity: 1;
        img{
            height:100%;
            width:100%;
            object-fit:cover;
            filter:grayscale(1) opacity(.2);
            mix-blend-mode:screen;
        }
        &::after{
            position:absolute;
            bottom:0;
            left:0;
            width:100%;
            height:60%;
            content:'';
            background: rgb(31,25,55);
            background: -moz-linear-gradient(0deg, rgba(31,25,55,1) 0%, rgba(31,25,55,0) 100%);
            background: -webkit-linear-gradient(0deg, rgba(31,25,55,1) 0%, rgba(31,25,55,0) 100%);
            background: linear-gradient(0deg, rgba(31,25,55,1) 0%, rgba(31,25,55,0) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#1f1937",endColorstr="#1f1937",GradientType=1); 
         }
    }
`;

const data = [
    {
        id: 1,
        artist: 'Kanye West',
        title: 'Self Conscious',
        length: 261, // in seconds
        album: 'Unreleased',
        cover: cover1,
    },
    {
        id: 2,
        artist: 'Steel Panther',
        title: 'Eyes of a Panther',
        length: 216, // in seconds
        album: 'Feel the Steel',
        cover: cover2,
    },
    {
        id: 3,
        artist: 'Kanye West',
        title: 'Stronger',
        length: 311, // in seconds
        album: 'Graduation',
        cover: cover3,
    },
    {
        id: 4,
        artist: 'System of a Down',
        title: 'Lonely Day',
        length: 167, // in seconds
        album: 'Hypnotize',
        cover: 'https://t-eska.cdn.smcloud.net/common/g/F/s/iG22360430WYK.jpg/ru-1-r-512,512-n-iG22360430WYK.jpg',
    },
    {
        id: 5,
        artist: 'Phill Collins, Phillip Bailey',
        title: 'Easy Lover',
        length: 304, // in seconds
        album: 'Chinese Wall',
        cover: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Chinese_Wall_%28Philip_Bailey_album_-_cover_art%29.jpg',
    },
    {
        id: 6,
        artist: 'Ozzy Osbourne',
        title: 'Bark at the Moon',
        length: 257, // in seconds
        album: 'Bark at the Moon',
        cover: 'https://image.ceneostatic.pl/data/products/2723909/i-black-sabbath-bark-at-the-moon.jpg',
    },
    {
        id: 7,
        artist: 'Berlin',
        title: 'Take my Breath Away',
        length: 255, // in seconds
        album: 'Top Gun - Motion Picture Soundtrack',
        cover: 'https://5.allegroimg.com/s1024/0c9aec/1ab28b934aafb4ecde525bf0ae65',
    },
    {
        id: 8,
        artist: 'Daryl Hall & John Oates',
        title: 'Out of Touch',
        length: 247, // in seconds
        album: 'The Essential',
        cover: 'https://lastfm.freetls.fastly.net/i/u/500x500/565f7251a59e4c2dccb86ab78539073f.jpg',
    },
];


class UsertivePlayerApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            play: false,
            showSongInfo: false,
            showSongsList: false,
            tracksListData: data,
        }
    }

    handleTogglePlay = () => {
        this.setState({ play: !this.state.play });
    }

    handleToggleSongInfo = () => {
        this.setState({ showSongInfo: !this.state.showSongInfo });
    }

    handleShowSongsList = () => {
        this.setState({ showSongsList: true });
    }
    handleHideSongsList = () => {
        this.setState({ showSongsList: false });
    }

    handleBackButton = () => {
        this.setState({ showSongsList: false, showSongInfo: false });
    }

    handleSwipeTracks = (tracksSwipe, direction, event) => {

        const shiftedArray = [...this.state.tracksListData];

        switch (direction) {
            case 'right': {
                const lastTrack = shiftedArray.pop();
                shiftedArray.unshift(lastTrack);
                this.setState({ tracksListData: shiftedArray });

                if (event === 'click') {
                    tracksSwipe.current.slickPrev();
                }

                break;
            }
            case 'left': {
                const firstTrack = shiftedArray.shift();
                shiftedArray.push(firstTrack);
                this.setState({ tracksListData: shiftedArray });

                if (event === 'click') {
                    tracksSwipe.current.slickNext();
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    render = () => {
        const { play, showSongInfo, showSongsList, tracksListData } = this.state;
        return (
            <AppBodyStyled>
                <div className={'overflowBackground'}>
                    <img src={background} alt="" />
                </div>
                <NavigationBar
                    toggleSongInfoHandler={this.handleToggleSongInfo}
                    backButtonHandler={this.handleBackButton}
                    songListState={showSongsList}
                    songInfoState={showSongInfo}
                    currentTrackAlbum={tracksListData[0].album} />
                <PlayerBody
                    playState={play}
                    togglePlayHandler={this.handleTogglePlay}
                    tracksListData={tracksListData}
                    swipeHandler={this.handleSwipeTracks} />
                <SongInfo
                    songInfoState={showSongInfo}
                    currentTrack={tracksListData[0]} />
                <TrackList
                    playState={play}
                    togglePlayHandler={this.handleTogglePlay}
                    songListState={showSongsList}
                    showSongsListHandler={this.handleShowSongsList}
                    hideSongsListHandler={this.handleHideSongsList}
                    tracksListData={tracksListData} />
            </AppBodyStyled>
        )
    }
}

export default UsertivePlayerApp;