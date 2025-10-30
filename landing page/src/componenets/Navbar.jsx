import { navLinks } from '../../constants/index.js';
  const Navbar = () => {
    return (
        <nav>
            <div>
                <a href="#home" className="flex item-center gap-2">
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