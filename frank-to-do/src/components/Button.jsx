import PropTypes from 'prop-types';

export default function Button({ text, onClick, type='normal' }) {

    switch (type) 
    {
        case 'normal':
            return (
                <button type="button" onClick={onClick} className="shadow-md bg-green-400 p-2 md:px-5" aria-label={text}>{text}</button>
            );
        case 'alert':
            return (
                <button type="button" onClick={onClick} className="bg-red-200 hover:bg-red-300 py-1 p-2 text-base" aria-label={text}>{text}</button>
            );
        default:
            return (
                <button type="button" onClick={onClick} className="shadow-md bg-green-400 p-2 md:px-5" aria-label={text}>{text}</button>
            );
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};