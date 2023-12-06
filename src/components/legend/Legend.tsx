import requiredMask from '../../assets/images/required-mask.png';
import recommendedMask from '../../assets/images/recommended-mask.png';
import recommendedTowel from '../../assets/images/recommended-towel.png';
import requiredTowel from '../../assets/images/required-towel.png';
import partialFountain from '../../assets/images/partial-fountain.png';
import forbiddenFountain from '../../assets/images/forbidden-fountain.png';
import requiredLock from '../../assets/images/required-lockerroom.png';
import partialLock from '../../assets/images/partial-lockerroom.png';
import forbiddenLock from '../../assets/images/forbidden-lockerroom.png';

const data = [
    {
        text: "Máscara",
        maskData: [
            {
                id: 1,
                image: requiredMask,
                label: "Obrigatório"
            },
            {
                id: 2,
                image: recommendedMask,
                label: "Recomendado"
            }
        ]
    },
    {
        text: "Toalha",
        maskData: [
            {
                id: 3,
                image: requiredTowel,
                label: "Obrigatório"
            },
            {
                id: 4,
                image: recommendedTowel,
                label: "Recomendado"
            }
        ]
    },
    {
        text: "Bebedouro",
        maskData: [
            {
                id: 5,
                image: partialFountain,
                label: "Parcial"
            },
            {
                id: 6,
                image: forbiddenFountain,
                label: "Proibido"
            }
        ]
    },
    {
        text: "Vestiários",
        maskData: [
            {
                id: 7,
                image: requiredLock,
                label: "Liberado"
            },
            {
                id: 8,
                image: partialLock,
                label: "Parcial"
            },
            {
                id: 9,
                image: forbiddenLock,
                label: "Fechado"
            }
        ]
    }
]

function Legend() {
    return (
        <>
            <div
                className='flex flex-wrap w-full p-4 bg-[#E8E8E8] rounded-lg justify-center items-center gap-x-20 gap-y-10'>
                {data.map(i => (
                    <div className='flex flex-col items-center' key={i.text}>
                        <p className='font-gothamBold'>{i.text}</p>
                        <div className='flex gap-x-4 mt-3'>
                            {i.maskData.map(s => (
                                <div className='flex flex-col items-center'  key={s.id}>
                                    <img src={s.image} alt={s.label} className='w-14 h-14' />
                                    <p className='font-gothamBook'>{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Legend;