import './form-input.styles.scss'

const FormInput = ({label, ...otherProps}) => {
    return (
    <div className="group">
    <input className="form-input"{...otherProps} />
    { label && (
        <label className={`${otherProps.value.length > 0 ? 'shrink' : ''
        }form-input-label`}>{label}</label>
        )}        
    </div>
        
    );
};

export default FormInput;

//This form input is showing the label and the input

//the label: it is showing the shrink effect from scss file that
//shrinks the label and puts it above the cursor
//If it is bigger then zero, call the scss effect called shrink,
//otherwise put an empty string

//If there is no label, do not render it
//If it exists render
