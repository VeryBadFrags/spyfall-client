import React, { useEffect, useState } from 'react'
import Card from './Card'

export default function Connect (props) {
  const [playerName, setPlayerName] = useState('')
  const [lobbyID, setLobbyID] = useState('')
  const [buttonText, setButtonText] = useState('🏠 Create Lobby')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.setGameMode(true)
    props.connectionManager.connect(
      playerName,
      lobbyID,
      props.onDisconnect,
      props.onMessageCallback
    )
  }

  const handleLobbyCodeChange = (event) => {
    const value = event.target.value
    if (event.target.value) {
      setButtonText('🔌 Join Lobby')
      setLobbyID(value.toUpperCase())
    } else {
      setButtonText('🏠 Create Lobby')
    }
  }

  // Add Lobby ID to URL
  useEffect(() => {
    let windowHash = window.location.hash.split('#')[1]
    if (windowHash) {
      if (windowHash.length > 8) {
        windowHash = windowHash.substring(0, 8)
      }
      setLobbyID(windowHash.toUpperCase())
    }
  }, [])

  return (
    <Card className='text-dark bg-light border-primary'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name-input' className='form-label'>
            <i className='fas fa-user' /> Name
          </label>
          <input
            id='name-input'
            type='text'
            className='form-control'
            required
            autoFocus
            maxLength='16'
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        {/* Lobby input */}
        <div className='mb-3'>
          <label htmlFor='lobby-input' className='form-label'>
            <i className='fas fa-dice' /> Lobby code
          </label>
          <input
            id='lobby-input'
            type='text'
            className='form-control'
            pattern='[A-Za-z0-9]*'
            title='Lobby Code'
            maxLength='8'
            autoComplete='off'
            value={lobbyID}
            onChange={handleLobbyCodeChange}
          />
        </div>
        <div className='d-grid'>
          <button type=' submit' className='btn btn-primary'>
            {buttonText}
          </button>
        </div>
      </form>
    </Card>
  )
}
