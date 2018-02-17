export const getUserName = async (accessToken) => {
  const initialFetch = await fetch('https://api.spotify.com/v1/me', {
      headers:{ Authorization: 'Bearer ' + accessToken }
    })
    const userInfo = await initialFetch.json()
    return userInfo.display_name.split(' ')[0]
}