import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loadProducts, productSelected } from '../store/productSlice';

import Table from "../components/table"
import Filter from "../components/filter";
import AddButton from "../components/ui/addButton";
import { IColumnsTable, IProduct } from '../interfaces/interfaces';
import '../styles/products-list.css'

const ProductsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let data = useSelector((state: any) => state.product?.list)?.map((item: IProduct) => {
        return { key: item.id, ...item }
    });

    useEffect(() => {
        //@ts-ignore
        dispatch(loadProducts());
    }, [dispatch]);

    const [filteredData, setFilteredData] = useState(null);

    const handleFilterChange = (e: any) => {
        setFilteredData(data.filter((item: IProduct) => Object.values(item).some(value => value.toLowerCase().includes(e.target.value.toLowerCase()))));
    }

    const navigateToForm = () => {
        dispatch(productSelected({ product: null }))
        navigate('nuevo-producto', { replace: true });
    }

    const columns: IColumnsTable[] = [
        { property: 'logo', text: 'Logo', type: 'image' },
        { property: 'name', text: 'Nombre del producto', type: 'string' },
        { property: 'description', text: 'Descripción', icon: 'information.svg', iconClass: 'icon-info', type: 'string' },
        { property: 'date_release', text: 'Fecha de liberación', icon: 'information.svg', iconClass: 'icon-info', type: 'date' },
        { property: 'date_revision', text: 'Fecha de reestracturación', icon: 'information.svg', iconClass: 'icon-info', type: 'date' },
        { property: '', options: ['Editar', 'Eliminar'], type: 'menu' }
    ]

    return <>
        <div className='flex space-between'>
            <Filter onChange={(e: any) => handleFilterChange(e)} />
            <AddButton addAction={navigateToForm} />
        </div>
        <Table data={filteredData ? filteredData : data} columns={columns} />
        <div className='table-total'>{
            //@ts-ignore
            filteredData ? filteredData.length : data?.length} Resultados</div>
    </>
}

export default ProductsList;