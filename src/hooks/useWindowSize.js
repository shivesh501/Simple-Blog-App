import {useState, useEffect} from "react";

const useWindowSize = () =>{
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
        
    })

    useEffect(() =>{
        const handleResize = () =>{
            setWindowSize({
                 width: window.innerWidth,
                height: window.innerHeight
               
            })
        
        }
            handleResize();
            window.addEventListener("resize", handleResize);

            const cleanUp = () => {
                //console.log(' runs if a useEffect dependency changes')
                window.removeEventListener("resize", handleResize)
            }//this cleanUp is important to prevent a memory leak!
            //since there is no dependency this useEffect Hook the cleanUp() essentially runs when the page reloads
            return cleanUp; 
            /* or i can simply return the anonymous function for the same like so 
             return () => {window.removeEventListener("resize", handleResize)}
            */
        
    },[]);

    return windowSize;
}

export default useWindowSize;