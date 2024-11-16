import { createRoot } from 'react-dom/client'
import FallCard from './components/FallCard.jsx'
import App from './App'
import TitleCard from './components/TitleCard.jsx'
import './index.css'
import './components/FallCard.css'
import Trim from './components/Trim.jsx'
import ImageScroll1 from './components/ImageScroll1.jsx'
import ImageScroll2 from './components/ImageScroll2.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <FallCard />
        <TitleCard />
        
        <ImageScroll1 />   
        <ImageScroll2 />
    </>
) 
