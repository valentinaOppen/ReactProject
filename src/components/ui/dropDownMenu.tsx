import { useNavigate } from 'react-router-dom';

import './../../styles/dropDownMenu.css';
import './../../styles/buttons.css';
import { useDispatch } from 'react-redux';
import { productSelected } from '../../store/productSlice';

const DropDownMenu = (product: any) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = () => {
        dispatch(productSelected(product))
        navigate('editar-producto', { replace: true });
    }

    const handleDelete = () => {
        dispatch(productSelected({ product: product, delete: true }))
        navigate('eliminar-producto', { replace: true });
    }

    return <div className="dropdown-menu">
        <ul>
            <li><button onClick={handleEdit} className='btn-dropdown-menu'>Editar <img src="images/pencil.svg" width={10} /></button></li>
            <li><button onClick={handleDelete} className='btn-dropdown-menu'>Eliminar <img src="images/trash.svg" width={10} /></button></li>
        </ul>
    </div>
}

export default DropDownMenu;