import spinner from '../resources/spinner.gif';

const Spinner = () => {
    return (
        <div style={{ textAlign: 'center', alignItems: 'center' }}>
            < img src={spinner} alt='spinner' />
            {/* <img src={process.env.PUBLIC_URL + '/spinner.gif'} alt="spinner" /> */}
        </div>
    )
}

export default Spinner;