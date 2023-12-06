import Gym from "../../models/Gym";
import requiredMask from '../../assets/images/required-mask.png';
import recommendedMask from '../../assets/images/recommended-mask.png';
import recommendedTowel from '../../assets/images/recommended-towel.png';
import requiredTowel from '../../assets/images/required-towel.png';
import partialFountain from '../../assets/images/partial-fountain.png';
import forbiddenFountain from '../../assets/images/forbidden-fountain.png';
import requiredLock from '../../assets/images/required-lockerroom.png';
import partialLock from '../../assets/images/partial-lockerroom.png';
import forbiddenLock from '../../assets/images/forbidden-lockerroom.png';

type Props = {data: Array<Gym>}

const imgDictionary = {
    mask: {
        required: requiredMask,
        recommended: recommendedMask
    },
    towel:{
        required: requiredTowel,
        recommended: recommendedTowel
    },
    fountain: {
        partial: partialFountain,
        not_allowed: forbiddenFountain
    },
    locker_room:{
        allowed: requiredLock,
        partial: partialLock,
        closed: forbiddenLock
    }
}

function List({data}: Props){
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-x-4 gap-y-2">
                {data.map((i, index) => {
                    return (
                        <div className='flex flex-col p-4 bg-[#E8E8E8] rounded-lg' key={`card-${index}`}>
                            {i.opened ? (
                                <p className="font-gothamBold text-green">Aberto</p>
                            ): (
                                <p className="font-gothamBold text-red">Fechado</p>
                            )}

                            <p className="text-2xl font-gothamBold mt-1 mb-2">{i.title}</p>

                            {i.content != null? (
                                <>
                                    <p className="pb-3 border-b-2 border-[#CDCDCD]" dangerouslySetInnerHTML={{ __html: i.content }} />

                                    <div className="grid grid-cols-4 mt-6 mb-8 gap-x-4 gap-y-2">
                                        <img src={imgDictionary["mask"][i.mask as keyof typeof imgDictionary.mask]} alt="Máscara"/>
                                        <img src={imgDictionary["towel"][i.towel as keyof typeof imgDictionary.towel]} alt="Toalha"/>
                                        <img src={imgDictionary["fountain"][i.fountain as keyof typeof imgDictionary.fountain]} alt="Bebedouro"/>
                                        <img src={imgDictionary["locker_room"][i.locker_room as keyof typeof imgDictionary.locker_room]} alt="Vestiários"/>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 mb-8" key={`schedule-${index}`}>
                                        {i.schedules?.map((s, index) => {
                                            return (
                                                <div key={`schedule-item-${index}`}>
                                                    {!s.weekdays.includes("Obs") && (
                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-2xl font-gothamBold">{s.weekdays}</p>
                                                            <p>{s.hour}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            ): (
                                <p>{i.street}, {i.region}, {i.state_name}-{i.uf}</p>
                            )}
                            
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default List;