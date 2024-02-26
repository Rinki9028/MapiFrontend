import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ApiHelper from '../../_helperFunctions/ApiHelper'
import { ACCOUNT_INFO } from '../../utils/Constant/ApiEndpoint'
import Logout from '../../_helperFunctions/Logout'

const Account = () => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getAccountInfo()
    }, [])

    const getAccountInfo = () => {
        ApiHelper.get(ACCOUNT_INFO).then(({data}) => {
            console.log('data:', data);
            if (data.status == 200) {
                setUserData(data.data)
            }
        }).catch(err => {
            console.log('err: ', err);
        })
    }
    return (
        <div>
            <p>Hello {userData?.Username}</p>
            <p>Secure Page</p>
            <button className='btn btn-primary' onClick={Logout}>Logout</button>
        </div>
    )
}

export default React.memo(Account)