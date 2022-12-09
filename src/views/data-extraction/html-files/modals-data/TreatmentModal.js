import {useState, useEffect} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios'

const TreatmentModal = props => {

    const {isOpen} = props
    const {setIsOpen} = props
    const {objectId} = props

    const toggle = () => setIsOpen(!isOpen);

    // const [treatment, setTreatment] = useState([])

    const [startDepth, setStartDepth] = useState('')
    const [endDepth, setEndDepth] = useState('')
    const [quantities, setQuantities] = useState('')
    const [chemicals, setChemicals] = useState('')

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/data-exstr/show_treatment/${objectId}/?format=json`)
                // setTreatment(res.data.data)
                //
                // console.log(res.data)

                const start_Depth = res.data.data['Start Depth'].map((el, index) => <span key={index}>[{el}],</span>)
                setStartDepth(start_Depth)

                const end_Depth = res.data.data['End Depth'].map((el, index) => <span key={index}>[{el}],</span>)
                setEndDepth(end_Depth)

                const quantities = res.data.data['Quantities'].map((el, index) => {
                    return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                        key={ix * 99999}>[{elx}],</span>)}],</span></div>
                })
                setQuantities(quantities)

                const chemicals = res.data.data['Chemicals'].map((el, index) => {
                    return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                        key={ix * 99999}>[{elx}],</span>)}],</span></div>
                })
                setChemicals(chemicals)

            } catch (err) {
                // console.log(err)
            }
        })()
    }, [objectId])

    return (<>
        <Modal isOpen={isOpen} toggle={toggle} size='xl' scrollable={true}>
            <ModalHeader toggle={toggle}>Treatment data</ModalHeader>
            <ModalBody>
                <div className='mt-2'>
                    <p className='text-center font-weight-bold p-2'>Start Depth</p>
                    <div className='px-5'>
                        <p className='text-justify'>{startDepth}</p>
                    </div>
                    <hr/>
                    <p className='text-center font-weight-bold p-2'>End Depth</p>
                    <div className='px-5'>
                        <p className='text-justify'>{endDepth}</p>
                    </div>
                    <hr/>
                    <p className='text-center font-weight-bold p-2'>Quantities</p>
                    <div className='px-5'>
                        {quantities}
                    </div>
                    <p className='text-center font-weight-bold p-2'>Chemicals</p>
                    <div className='px-5'>
                        {chemicals}
                    </div>
                </div>
            </ModalBody>
        </Modal>
    </>)
}

export default TreatmentModal