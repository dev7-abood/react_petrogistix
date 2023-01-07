// ** Third Party Components
import {Card, CardText, Row, Col} from 'reactstrap'
import {User, Check, Mail} from 'react-feather'
import axios from 'axios'
import {useEffect, useState} from 'react'

const UserInfoCard = _ => {

    const [userInfo, setUserInfo] = useState([])

    useEffect(_ => {
        (async _ => {
            try {
                const res = await axios.get('/user/get_user_info/')
                setUserInfo(res.data.data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (<Card>
        <Row>
            <Col xl='6' lg='12' className='mt-2 mt-xl-0'>
                <div className='user-info-wrapper'>
                    <div className='d-flex flex-wrap align-items-center my-50'>
                        <div className='user-info-title'>
                            <Check className='mr-1' size={14}/>
                            <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                                Full name:&nbsp;
                            </CardText>
                        </div>
                        <CardText className='text-capitalize mb-0'>
                            {userInfo.first_name}&nbsp;{userInfo.last_name}
                        </CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center'>
                        <div className='user-info-title'>
                            <User className='mr-1' size={14}/>
                            <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                                Username:&nbsp;
                            </CardText>
                        </div>
                        <CardText className='mb-0'>
                            {userInfo.username}
                        </CardText>
                    </div>
                    <div className='d-flex flex-wrap align-items-center my-50'>
                        <div className='user-info-title'>
                            <Mail className='mr-1' size={14}/>
                            <CardText tag='span' className='user-info-title font-weight-bold mb-0'>
                                E-mail:&nbsp;
                            </CardText>
                        </div>
                        <CardText className='mb-0'>
                            {userInfo.email}
                        </CardText>
                    </div>
                </div>
            </Col>
        </Row>
    </Card>)
}

export default UserInfoCard
