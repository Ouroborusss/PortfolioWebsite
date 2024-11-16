import './ImageScroll1.css'
import selectedRows from '../assets/row-one.json'
import { useEffect, useRef } from 'react';

function ImageScroll1() {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        
        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
        
        const handleOnUp = () => {
            track.dataset.mouseDownAt = "0";  
            track.dataset.prevPercentage = track.dataset.percentage;
        }
        
        const handleOnMove = e => {
            if(track.dataset.mouseDownAt === "0") return;
        
            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = (window.innerWidth / 2);
        
            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        
            track.dataset.percentage = nextPercentage;
        
            //animate track
            track.animate({
                transform: `translate(${nextPercentage - 9}%, 100%)` //-9% to center img at start
            }, { duration: 1200, fill: "forwards" });

            //animate images    
            for(const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `${100 + nextPercentage}% center`
                }, { duration: 1200, fill: "forwards" });
            }
        }

        // Add event listeners
        window.addEventListener('mousedown', handleOnDown);
        window.addEventListener('touchstart', e => handleOnDown(e.touches[0]));
        window.addEventListener('mouseup', handleOnUp);
        window.addEventListener('touchend', e => handleOnUp(e.touches[0]));
        window.addEventListener('mousemove', handleOnMove);
        window.addEventListener('touchmove', e => handleOnMove(e.touches[0]));

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener('mousedown', handleOnDown);
            window.removeEventListener('touchstart', e => handleOnDown(e.touches[0]));
            window.removeEventListener('mouseup', handleOnUp);
            window.removeEventListener('touchend', e => handleOnUp(e.touches[0]));
            window.removeEventListener('mousemove', handleOnMove);
            window.removeEventListener('touchmove', e => handleOnMove(e.touches[0]));
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <>
            <div id="image-track" ref={trackRef} data-mouse-down-at={0} data-prev-percentage="0">
                {selectedRows.map((image) => (
                    <img 
                        key={image.name}
                        className="image"
                        src={image.url}
                        alt={image.name.replace(/\.[^/.]+$/, '')} // Removes file extension
                        draggable="false"
                    />
                ))}
            </div>
        </>
    )
}

export default ImageScroll1