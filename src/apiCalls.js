export const getUserName = async (accessToken) => {
  const initialFetch = await fetch('https://api.spotify.com/v1/me', {
      headers:{ Authorization: 'Bearer ' + accessToken }
    })
    const userInfo = await initialFetch.json()
    return {
      name: userInfo.display_name.split(' ')[0],
      id: userInfo.id
    } 
}

export const getPlaylistData = async (bpm, genre, accessToken) => {
  const initialFetch = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_genres=${genre}&target_tempo=${bpm}`,
    { headers: { Authorization: 'Bearer ' + accessToken }
  })
  return await initialFetch.json()
}