import {useState, useEffect} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios'

const TopModal = props => {

    const {isOpen} = props
    const {setIsOpen} = props
    const {objectId} = props

    const toggle = () => setIsOpen(!isOpen);

    const [top, setTop] = useState([])

    const [startDepth, setStartDepth] = useState('')
    const [endDepth, setEndDepth] = useState('')
    const [formation, setFormation] = useState('')
    const [topDepth, setTopDepth] = useState('')
    const [date, setDate] = useState('')

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/data-exstr/show_top/${objectId}/?format=json`)
                setTop(res.data.data)

                console.log(res.data.data)

                const start_Depth = res.data.data['Start Depth'].map((el, index) => <span key={index}>[{el}],</span>)
                setStartDepth(start_Depth)

                const end_Depth = res.data.data['End Depth'].map((el, index) => <span key={index}>[{el}],</span>)
                setEndDepth(end_Depth)

                const formation = res.data.data['Formation'].map((el, index) => {
                    return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                        key={ix * 99999}>[{elx}],</span>)}],</span></div>
                })
                setFormation(formation)

                const topDepth = res.data.data['Top Depth'].map((el, index) => {
                    return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                        key={ix * 99999}>[{elx}],</span>)}],</span></div>
                })
                setTopDepth(topDepth)

                // res.data

            } catch (err) {
                // console.log(err)
            }
        })()
    }, [objectId])

    return (<>
        <Modal isOpen={isOpen} toggle={toggle} size='xl' scrollable={true}>
            <ModalHeader toggle={toggle}>Top data</ModalHeader>
            <ModalBody>
                <div>
                    <table className="table">
                        <tbody>
                        <tr>
                            <th className='text-center'>Well</th>
                            <th className='text-center'>Rig</th>
                            <th className='text-center'>Date</th>
                        </tr>
                        {/*{!isObjEmpty(top) ?*/}
                        <tr>
                            <td className='text-center'>{top.Well}</td>
                            <td className='text-center'>{top.Rig}</td>
                            <td className='text-center'>{'xxx'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
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
                    <p className='text-center font-weight-bold p-2'>Formation</p>
                    <div className='px-5'>
                        {formation}
                    </div>
                    <p className='text-center font-weight-bold p-2'>Top Depth</p>
                    <div className='px-5'>
                        {topDepth}
                    </div>
                </div>
            </ModalBody>
        </Modal>
    </>)
}

export default TopModal