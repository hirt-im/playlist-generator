export default function Playlist({playlistID}){
    if(!playlistID){return null;}
    return(
        <div>
            <iframe src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`}
                    width="500"
                    height="380"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    title="Spotify Playlist">
            </iframe>
        </div>
    );
}