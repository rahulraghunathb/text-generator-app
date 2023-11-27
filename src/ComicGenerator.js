// ComicGenerator.js
import React, { useState } from 'react'
import './ComicGenerator.css'
import { query } from './script'

const ComicGenerator = () => {
  const [comicText, setComicText] = useState('')

  const [comicStripImages, setComicStripImages] = useState([]) // Container for comic strip images
  const [panelImages, setPanelImages] = useState([]) // Container for panel images

  const handleInputChange = (e) => {
    setComicText(e.target.value)
  }

  const handleGenerate = async () => {
    try {
      console.log(comicText)
      const imageBlob = await query({ inputs: comicText })
      const imageUrl = URL.createObjectURL(imageBlob)

      // Clear the panel images and add the new image
      setPanelImages([imageUrl])

      // Add the new image to the comic strip images
      //   setComicStripImages((prevImages) => [...prevImages, imageUrl])
      setComicText('')
    } catch (error) {
      console.error('Error in API request:', error)
    }
  }

  const handleAddToComicStrip = () => {
    // Add the panel images to the comic strip images
    setComicStripImages((prevStripImages) => [
      ...prevStripImages,
      ...panelImages
    ])
  }

  return (
    <div className="comic-generator">
      <input
        type="text"
        placeholder="Enter your comic text here..."
        value={comicText}
        onChange={handleInputChange}
      />
      <button onClick={handleGenerate}>Generate</button>
      <button onClick={() => setPanelImages([])}>Clear Panel</button>
      <button onClick={handleAddToComicStrip}>Add to Comic Strip</button>

      {/* Panel images */}
      <div className="panel-container">
        {panelImages.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Panel Image ${index + 1}`} />
        ))}
      </div>

      {/* Comic strip images */}
      <div className="strip-container">
        {comicStripImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Comic Strip Image ${index + 1}`}
            style={{ width: '100px', height: '100px', marginRight: '5px' }}
          />
        ))}
      </div>
    </div>
  )
}

export default ComicGenerator
