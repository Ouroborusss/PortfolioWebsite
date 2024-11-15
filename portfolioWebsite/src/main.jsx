import { createRoot } from 'react-dom/client'
import FallCard from './components/FallCard.jsx'
import App from './App'
import TitleCard from './components/TitleCard.jsx'
import './index.css'
import './components/FallCard.css'

createRoot(document.getElementById('root')).render(
    <>
        <FallCard />
        <TitleCard />
    </>
) 
