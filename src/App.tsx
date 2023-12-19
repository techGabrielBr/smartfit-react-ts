import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Legend from './components/legend/Legend';
import Form from './components/form/Form';
import Gym from './models/Gym';
import ApiResponse from './models/ApiResponse';
import List from './components/list/List';
import { useFirstRender } from './hooks/useFirstRender';
import toast, { Toaster } from 'react-hot-toast';
import Filter from './models/Filter';

function App() {
  const firstRender = useFirstRender();

  const [list, setList] = useState<Array<Gym>>([]);
  const [filteredList, setFilteredList] = useState<Array<Gym>>([]);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState({
    dirty: false,
    hour: '',
    onlyOpened: true
  });
  const [prevList, setPrevList] = useState<Array<Gym>>([])

  const changeFilter = (newFilter: Filter) => {
    setFilter({
      dirty: newFilter.dirty,
      hour: newFilter.hour,
      onlyOpened: newFilter.onlyOpened
    });
  }

  useEffect(() => {
    if(!firstRender && filter.dirty == true){
      let newlist = [];

      filter.onlyOpened == false ? newlist = list.filter(i => i.opened == false || i.opened == null) 
        : newlist = list.filter(i => i.opened == true)

      filter.hour != '' ? newlist = newlist.filter(function(i){
        let includes = false;

        i.schedules?.forEach(function(s){
          if(s.hour != "Fechada" && s.weekdays != "Obs.:"){
            let str = "";
            s.hour.includes(":") ? str = s.hour.replaceAll(":", "") : str = s.hour.replaceAll("h", "00")
            str = str.replace("às", ":");

            const itemArrHour = str.split(":");
            const filterArrHour = filter.hour.split('/');

            if(Number(filterArrHour[0]) <= Number(itemArrHour[0]) && Number(filterArrHour[1]) <= Number(itemArrHour[1])){
              includes = true;
              return;
            }
          }
        })

        if(!includes){
          return false;
        }

        return true;
      }) : null
      
      setPrevList(newlist)
      setTotal(newlist.length)
    }
  }, [firstRender, filter, list]);

  useEffect(() => {
    getlAllGym()
  }, [])

  const getlAllGym = () => {
    axios.get<ApiResponse>("https://test-frontend-developer.s3.amazonaws.com/data/locations.json")
      .then((r) => {  
        setList( r.data.locations)
        setFilteredList(r.data.locations)
      })
      .catch((e) => {console.log(e)})
  }

  const resetList = () => {
    setFilter({
      dirty: false,
      hour: '',
      onlyOpened: true
    })

    setFilteredList(list)
    setTotal(0)
  }

  const updateList = () => {
    if(filter.hour == ''){
      toast.error('É necessário selecionar um horário de treino para realizar a pesquisa.')
    }else{
      setFilteredList(prevList);
      window.location.href = "#list-box"
    }
  }

  return (
    <>
      <Header></Header>
      <div className='min-h-screen flex flex-col justify-between'>
        <div className='py-24 xl:px-64 lg:px-50 md:px-40 sm:px-30 px-10'>
          <h1 className='sm:text-5xl text-4xl w-[300px] font-gothamBlack'>REABERTURA SMART FIT</h1>

          <div className='w-20 h-2.5 bg-dark-grey my-5'></div>

          <p className='font-gothamBook'>
            O funcionamento das nossas unidades estão seguindo o decreto de cada município. 
            Por isso, confira aqui se sua unidade está aberta e as medidas de segurança que estamos seguindo.
          </p>

          <div className='mt-8'>
            <Form setParentFilter={changeFilter} total={total} resetList={resetList} filter={filter} updateList={updateList}></Form>
          </div>

          <div className='my-8'>
            <Legend></Legend>
          </div>

          <div id='list-box'>
            {filteredList.length > 0 && <List data={filteredList}></List>}
            {filteredList.length == 0 && <p className='text-center font-gothamBold mt-8' id='notfound'>Nenhuma academia encontrada</p>}
          </div>
        </div>
        <Footer></Footer>
      </div>
      <Toaster 
        position="top-left"
        reverseOrder={false}
      />
    </>
  )
}

export default App
