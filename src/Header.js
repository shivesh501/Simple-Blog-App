
import { FaLaptop,FaTabletAlt, FaMobileAlt } from 'react-icons/fa'

//Custom Hook
import useWindowSize from './hooks/useWindowSize'
const Header = ({title}) => {
  const {width} = useWindowSize();
  return (
    <header className="Header">
      <h1>{title}</h1>
      {
        width < 768? <FaMobileAlt/> 
        : width < 992? <FaTabletAlt/>
        : <FaLaptop/>
      } {/* depending upon the width of the screen it will show a mobile/tablet/laptop icon */}
    </header>
  )
}

export default Header
