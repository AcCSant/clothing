import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return (
        <button 
        className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        {...otherProps}
               >
            {children}
        </button>
    );
};

export default Button;


/* We know we have three types of buttons, how do we render to show three 
different styles - we can controll by using a variable (BUTTON_TYPE_CLASSES )
default

inverted

google sign in button


*/