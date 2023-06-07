import './../../styles/buttons.css';

const AddButton = ({ addAction }: any) => {
    return <button className='btn-add' onClick={addAction}>Agregar</button>
}

export default AddButton;