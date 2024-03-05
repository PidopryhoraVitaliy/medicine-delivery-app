import { NavLink } from 'react-router-dom';
import './appHeader.css';

const AppHeader = () => {
    return (
        <header className="app__header">
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            end
                            style={({ isActive }) => ({
                                color: isActive ? '#5050FF' : 'inherit',
                                textDecorationLine: isActive ? 'underline' : 'none'
                            })}
                            to='/'
                        >
                            Shop
                        </NavLink>
                    </li>
                    |
                    <li>
                        <NavLink
                            // end
                            style={({ isActive }) => ({
                                color: isActive ? '#5050FF' : 'inherit',
                                textDecorationLine: isActive ? 'underline' : 'none'
                            })}
                            to='/cart'
                        >
                            Shopping Cart
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;