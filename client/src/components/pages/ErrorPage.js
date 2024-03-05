import { NavLink } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';

const ErrorPage = () => {
    return (
        <div style={{
            'textAlign': 'center',
            'fontWeight': 'bold',
            'fontSize': '24px'
        }}>
            <ErrorMessage />
            <p >                Page doesn't exist            </p>
            <NavLink end to='/'>
                Back to main page
            </NavLink>
        </div >
    )
}

export default ErrorPage;