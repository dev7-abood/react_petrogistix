import {useState, useEffect} from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import axios from 'axios'

const MudModal = props => {

    const {isOpen} = props
    const {setIsOpen} = props
    const {objectId} = props

    const toggle = () => setIsOpen(!isOpen);

    const [startDepth, setStartDepth] = useState('')
    const [endDepth, setEndDepth] = useState('')
    const [topDepth, setTopDepth] = useState('')

    const [weight, setWeight] = useState('')
    const [setFiltrateWL, FiltrateWL] = useState('')
    const [setPV, PV] = useState('')
    const [setYP, YP] = useState('')
    const [setElectricalStability, ElectricalStability] = useState('')
    const [setRPM, RPM] = useState('')
    const [setGelsSec, GelsSec] = useState('')
    const [setPH, PH] = useState('')
    const [setCA, CA] = useState('')
    const [setFL, FL] = useState('')
    const [setCake, Cake] = useState('')
    const [setCakeAPI, CakeAPI] = useState('')
    const [setWater, Water] = useState('')
    const [setOil, Oil] = useState('')
    const [setSolids, Solids] = useState('')
    const [setFunnelVis, FunnelVis] = useState('')


    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get(`/data-exstr/show_mud/${objectId}/?format=json`)

                const start_Depth = res.data.data['Start Depth'].map((el, index) => <span key={index}>[{el}],</span>)
                setStartDepth(start_Depth)

                const end_Depth = res.data.data['End Depth'].map((el, index) => <span key={index}>[{el}],</span>)
                setEndDepth(end_Depth)

                const topDepth = res.data.data['Top Depth'].map((el, index) => {
                    return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                        key={ix * 99999}>[{elx}],</span>)}],</span></div>
                })
                setTopDepth(topDepth)

                const weights = res.data.data['Weight'].map((el, index) => {
                    return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                        key={ix * 99999}>[{elx}],</span>)}],</span></div>
                })
                setWeight(weights)

                // const FunnelVis = res.data.data['Funnel Vis.'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setFunnelVis(FunnelVis)
                //
                // const Filtrate_WL = res.data.data['Filtrate(WL)'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setFiltrateWL(Filtrate_WL)
                //
                // // const funnelVis = res.data.data['Filtrate (WL)'].map((el, index) => {
                // //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                // //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // // })
                // // setFunnelVis(funnelVis)
                //
                // const PV = res.data.data['PV'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setPV(PV)
                //
                // const YP = res.data.data['YP'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setYP(YP)
                //
                //
                // const ElectricalStability = res.data.data['Electrical Stability'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setElectricalStability(ElectricalStability)
                //
                // const RPM = res.data.data['3/6 RPM'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setRPM(RPM)
                //
                // const GelsSec = res.data.data['Gels Sec/Min'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setGelsSec(GelsSec)
                //
                // const PH = res.data.data['PH'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setPH(PH)
                //
                // const CA = res.data.data['CA PPM'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setCA(CA)
                //
                // const FL = res.data.data['FL Temp'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setFL(FL)
                //
                // const CakeHTHP = res.data.data['Cake HTHP'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setCake(CakeHTHP)
                //
                // const CakeAPI = res.data.data['Cake API'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setCakeAPI(CakeAPI)
                //
                // const Water = res.data.data['Water Vol. %'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setWater(Water)
                //
                // const Oil = res.data.data['Oil Vol. %'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setOil(Oil)
                //
                // const Solids = res.data.data['Solids Vol. %'].map((el, index) => {
                //     return <div key={index} className='m-0'><span>[{el.map((elx, ix) => <span
                //         key={ix * 99999}>[{elx}],</span>)}],</span></div>
                // })
                // setSolids(Solids)

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
                <div className='mt-2'>
                    <p className='text-center font-weight-bold p-2'>Start Depth</p>
                    <div className='px-5'>
                        <p className='text-justify'>{startDepth}</p>
                    </div>
                    <p className='text-center font-weight-bold p-2'>End Depth</p>
                    <div className='px-5'>
                        <p className='text-justify'>{endDepth}</p>
                    </div>
                    <p className='text-center font-weight-bold p-2'>Weight</p>
                    <div className='px-5'>
                        <p className='text-justify'>{weight}</p>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    </>)
}

export default MudModal