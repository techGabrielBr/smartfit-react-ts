import iconhour from '../../assets/images/icon-hour.png'
import Filter from '../../models/Filter'

type Props = {total: number, setParentFilter: CallableFunction, resetList: CallableFunction, filter: Filter, updateList: CallableFunction}

function Form({total, setParentFilter, resetList, filter, updateList}: Props) {
    const onHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParentFilter({
            ...filter,
            dirty: true,
            hour: e.target.value,
        })
    }

    const onOnlyOpenedChange = () => {
        const checkbox = document.getElementById('check-fechadas') as HTMLInputElement
        let value = true;

        if(checkbox.checked){
            value = false;
        }

        setParentFilter({
            ...filter,
            dirty: true,
            onlyOpened: value
        })
    }

    return (
        <>
            <div className='w-full p-4 border-[3px] rounded-lg border-[#CDCDCD]'>
                <div className='flex items-center'>
                    <img src={iconhour} alt="Ícone do horário" className='mr-3 w-8 h-8'/>
                    <p className='font-gothamLight'>Horário</p>
                </div>
                <p className='text-2xl mb-2 mt-4 font-gothamLight pb-4 border-b-2 border-[#CDCDCD] mb-4'>Qual período quer treinar?</p>

                <form>
                    <div className='flex justify-between pb-3 border-b-2 border-[#CDCDCD] mb-2'>
                        <div className='flex'>
                            <input type="radio" name="hour" id="radio-manha" className='mr-2' value="0600/1200" onChange={onHourChange} checked={filter.hour == "0600/1200"}/>
                            <label htmlFor="radio-manha" className='font-gothamLight'>Manhã</label>
                        </div>
                        <p className='font-gothamLight'>06:00 às 12:00</p>
                    </div>

                    <div className='flex justify-between pb-3 border-b-2 border-[#CDCDCD] mb-2'>
                        <div className='flex'>
                            <input type="radio" name="hour" id="radio-tarde" className='mr-2' value="1201/1800" onChange={onHourChange} checked={filter.hour == "1201/1800"}/>
                            <label htmlFor="radio-tarde" className='font-gothamLight'>Tarde</label>
                        </div>
                        <p className='font-gothamLight'>12:01 às 18:00</p>
                    </div>

                    <div className='flex justify-between pb-3 border-b-2 border-[#CDCDCD]'>
                        <div className='flex'>
                            <input type="radio" name="hour" id="radio-noite" className='mr-2' value="1801/2300" onChange={onHourChange} checked={filter.hour == "1801/2300"}/>
                            <label htmlFor="radio-noite" className='font-gothamLight'>Noite</label>
                        </div>
                        <p className='font-gothamLight'>18:01 às 23:00</p>
                    </div>

                    <div className='flex flex-wrap gap-y-3 gap-x-2 items-center justify-between mt-14'>
                        <div>
                            <input type="checkbox" name="onlyOpened" id="check-fechadas" className='mr-2' value="true" onChange={onOnlyOpenedChange} checked={filter.onlyOpened == false}/>
                            <label htmlFor="check-fechadas" className='font-gothamBook'>Exibir unidades fechadas</label>
                        </div>
                        <p className='font-gothamBook'>Resultados encontrados: {total}</p>
                    </div>

                    <div className='flex flex-wrap justify-center mt-10 gap-x-7 gap-y-3'>
                        <button className=' w-[350px] bg-transparent hover:bg-yellow font-semibold py-2 px-4 border border-blue-500 rounded font-gothamBold' type='button' onClick={() => updateList()}>ENCONTRAR UNIDADE</button>
                        <button className='w-[350px] bg-transparent hover:bg-red font-semibold hover:text-white py-2 px-4 border border-blue-500 rounded font-gothamBold' type='reset' onClick={() => resetList()}>LIMPAR</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form;