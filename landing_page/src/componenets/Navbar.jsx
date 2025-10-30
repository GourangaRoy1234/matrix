import { navLinks } from '../../constants/index.js';
import {useGSAP } from '@gsap/react';
  const Navbar = () => {
    useGSAP(()=>{
      // GSAP animation code for Navbar can be added here
      const navTween = gsap.timeline({
        scrollTrigger: {
          trigger: 'nav',
          start: 'bottom top'
      }
    });
    navTween.fromTo('nav', {backgroundColor: 'transparent'}, {
        backgroundColor: '#a2707050',
        backgroundFilter: 'blur(10px)',
        duration: 1,
        ease: 'power1.inOut',
      });
    })

    return (
        <nav>
            <div>
                <a href="#home" className="flex item-center gap-2">
                <img src="/images/logo.png" alt="logo" />
                    <p>Velvet Pour</p>
                </a>
                {/* Navigation Links method to create navbar*/}
                <ul>
                    {navLinks.map((link)=>(
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>

                        </li>
                    ))}
                </ul>
            </div>

        </nav>
    )
}
export default Navbar;