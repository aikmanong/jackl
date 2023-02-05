import React, { useCallback, useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./Spotify.css";

const CLIENT_ID = "0dcd82cfd63d46acbdf74da7838cba66";
const REDIRECT_URI = "http://localhost:3001/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const spotify = new SpotifyWebApi();

interface IArtist {
  id: string;
  name: string;
  url: string;
}

interface IAlbum {
  height?: number;
  imageUrl: string;
  url: string;
  width?: number;
}

interface ISearchResults {
  albumInfo: IAlbum;
  artists: IArtist[];
  externalUrl: string;
  name: string;
  songId: string;
}

interface ISpotifyProps {
  emotion?: string;
}

export const Spotify = ({ emotion }: ISpotifyProps) => {
  const [token, setToken] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResults[]>();
  const [searchResultsConverted, setSearchResultsConverted] =
    useState<JSX.Element[]>();

  const renderSearchResults = (songs: ISearchResults[]) => {
    return songs
      .map((song) => {
        return (
          <div className="song-container" key={song.songId}>
            <a href={song.albumInfo.url} title="Click to view album in Spotify">
              <img src={song.albumInfo.imageUrl}></img>
            </a>
            <a
              href={song.externalUrl}
              title="Click to view song in Spotify"
            >{`${song.name}`}</a>
            <text> by </text>
            {song.artists.map((artist, index, array) => {
              return (
                <>
                  <a
                    key={artist.id}
                    href={artist.url}
                    title={`Click to view ${artist.name} in Spotify`}
                  >{`${artist.name}`}</a>
                  {index === array.length - 1 ? <></> : <text>, </text>}
                </>
              );
            })}
          </div>
        );
      })
      .reverse();
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const search = useCallback(
    (searchTerm: string) => {
      spotify
        .searchTracks(searchTerm, { limit: 20 })
        .then((searchResult) => {
          const results: ISearchResults[] = searchResult.tracks.items.map(
            (track) => {
              return {
                albumInfo: {
                  height: track.album.images[2].height,
                  imageUrl: track.album.images[2].url,
                  url: track.album.external_urls.spotify,
                  width: track.album.images[2].width,
                },
                artists: track.artists.map((artist) => {
                  return {
                    id: artist.id,
                    name: artist.name,
                    url: artist.external_urls.spotify,
                  };
                }),
                externalUrl: track.external_urls.spotify,
                name: track.name,
                songId: track.id,
              };
            }
          );
          setSearchResults(results);
        })
        .catch((error) => {
          console.log(
            `Something went wrong when searching for ${emotion}. Error: ${error}`
          );
        });
    },
    [emotion]
  );

  useEffect(() => {
    const hash = window.location.hash;
    let token: string | undefined | null = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        ?.split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token as string);
    }

    setToken(token as string);
    spotify.setAccessToken(token as string);
  }, []);

  useEffect(() => {
    if (searchResults)
      setSearchResultsConverted(renderSearchResults(searchResults));
  }, [searchResults]);

  useEffect(() => {
    if (emotion && token) {
      search(emotion);
    }
  }, [emotion, search, token]);
  return (
    <>
      <div className="spotify-button-container">
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify to get song recommendations
          </a>
        ) : (
          <>
            <button onClick={logout}>Logout</button>
            <br />
            <text>Upload an image to search for song recommendations</text>
          </>
        )}
      </div>
      <div className="spotify-search-container">{searchResultsConverted}</div>
    </>
  );
};
