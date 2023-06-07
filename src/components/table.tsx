import { IColumnsTable } from '../interfaces/interfaces';
import moment from 'moment'
import dots from '../assets/dots.svg';
import './../styles/table.css';
import DropDownMenu from './ui/dropDownMenu';
import { useState } from 'react';

const Table = (props: { data: any, columns: IColumnsTable[] }) => {
    const [menuActive, setMenuActive] = useState(-1);

    const handleMenuActive = (index: number) => {
        if (menuActive === index) setMenuActive(-1);
        else setMenuActive(index);
    }
    return (
        <table>
            <thead>
                <tr key='1'>
                    {props.columns.map((x: IColumnsTable) => { return <th key={x.text}>{x.text} {x.icon ? <img className={x.iconClass} src={`images/${x.icon}`} /> : ''}</th> })}
                </tr>
            </thead>
            <tbody>
                {props.data.map((x: any, index: number) => {
                    return <tr key={x.id}>
                        {props.columns.map((column: IColumnsTable) => {
                            return <td key={x.key + column.property}>
                                {
                                    column.type === 'date' ? moment(x[column.property]).format('L') :
                                        column.type === 'image' ? <img className="img-logo" alt="JS" src={x[column.property]} /> :
                                            column.type === 'menu' ?
                                                <div className='relative'>
                                                    <button className='btn-transparent' onClick={() => handleMenuActive(index)}>
                                                        <img className="icon-dots" src={dots} />
                                                    </button>
                                                    {menuActive === index ? <DropDownMenu product={x} /> : ''}
                                                </div>
                                                : x[column.property]
                                }
                            </td>
                        })}

                        <td></td>
                    </tr>
                })


                }
            </tbody>
        </table>)

}

export default Table;