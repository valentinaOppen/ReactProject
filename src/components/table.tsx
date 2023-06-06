import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/productSlice";
import { IProductState, IProduct } from '../interfaces/interfaces';

const Table = () => {
    const dispatch = useDispatch();
    let products = useSelector((state: any) => state.product.list);

    useEffect(() => {
        //@ts-ignore
        dispatch(loadProducts());
    }, [dispatch]);

    return (
        <table>
            <tr>
                <th>Logo</th>
                <th>Nombre del producto</th>
                <th>Descripción</th>
                <th>Fecha de liberación</th>
                <th>Fecha de reestracturación</th>
            </tr>

            {products.map((x: IProduct) => {
                return <> <tr key={x.name}>
                    <td>JG</td>
                    <td>{x.name}</td>
                    <td>{x.description}</td>
                    <td>{x.date_release.toString()}</td>
                    <td>{x.date_revision.toString()}</td>
                </tr>
                </>
            })}
        </table>)

}

export default Table;