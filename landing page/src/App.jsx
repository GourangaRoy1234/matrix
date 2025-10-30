import  gsap  from 'gsap';
import { ScrollTrigger, SplitText} from 'gsap/all';
import Navbar from './componenets/Navbar.jsx';
gsap.registerPlugin(ScrollTrigger,SplitText);

import React from 'react'
const App = () => {
  return (
   <main>
    <Navbar />
   </main>
  )
}
export default App