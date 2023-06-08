import './../styles/inputs.css'

const Filter = ({ onChange }: any) => {
    return <input className='filter-input' placeholder='Search..' type="text" onChange={(e) => onChange(e.target.value)} />
}

export default Filter;