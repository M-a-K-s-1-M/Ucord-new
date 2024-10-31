import './SubmitButton.css'

// eslint-disable-next-line react/prop-types
export default function SubmitButton({ children }) {
    return (
        <button className='submit-btn' type='submit'>{children}</button>
    )
}