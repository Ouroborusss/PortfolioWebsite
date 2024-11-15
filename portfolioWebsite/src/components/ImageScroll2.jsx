import './ImageScroll2.css'
import selectedRows from '../assets/row-two.json'

function ImageScroll2() {
    const track = document.getElementById("image-track");

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

    /* -- Had to add extra lines for touch events -- */

    window.onmousedown = e => handleOnDown(e);

    window.ontouchstart = e => handleOnDown(e.touches[0]);

    window.onmouseup = e => handleOnUp(e);

    window.ontouchend = e => handleOnUp(e.touches[0]);

    window.onmousemove = e => handleOnMove(e);

    window.ontouchmove = e => handleOnMove(e.touches[0]);

    return (
        <>
            <div id="image-track" data-mouse-down-at={0} data-prev-percentage="0">
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

export default ImageScroll2