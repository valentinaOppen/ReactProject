import { useState } from 'react';
import moment from 'moment'

import DropDownMenu from './ui/dropDownMenu';
import { IColumnsTable } from '../interfaces/interfaces';
import './../styles/table.css';
import dots from '../assets/dots.svg';


const Table = (props: { data: any, columns: IColumnsTable[] }) => {
    const [menuActive, setMenuActive] = useState(-1);

    const handleMenuActive = (index: number) => {
        if (menuActive === index) setMenuActive(-1);
        else setMenuActive(index);
    }
    return (
        <table>
            <thead>
                <tr key={props.columns[0].property}>
                    {props.columns.map((x: IColumnsTable, index: number) => { return <th key={`${x.property}_${x.text}`}>{x.text} {x.icon ? <img className={x.iconClass} alt={`Column ${index} icon`} src={`images/${x.icon}`} /> : ''}</th> })}
                </tr>
            </thead>
            <tbody>
                {props.data?.map((x: any, index: number) => {
                    return <tr key={x.id}>
                        {props.columns.map((column: IColumnsTable) => {
                            return <td key={x.key + column.property}>
                                {
                                    column.type === 'date' ? moment(x[column.property]).format('L') :
                                        column.type === 'image' ? <img className="img-logo" src={x[column.property]} /> :
                                            column.type === 'menu' ?
                                                <div className='relative'>
                                                    <button data-testid="menu-button" className={`btn-transparent ${menuActive === index ? 'active' : ''} `} onClick={() => handleMenuActive(index)}>
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