import React, { useEffect, useState } from 'react'
import ApiHelper from '../../_helperFunctions/ApiHelper'
import { GETEVENTS, GETLOCATION, GETSERVERPARTNER, LEADENTRYINSERT } from '../../utils/Constant/ApiEndpoint'
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import ErrorMessages from '../../_helperFunctions/ErrorMessages'
import { Controller, useForm } from 'react-hook-form'

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LeadAdd = () => {
    const [partnerData, setPartnerData] = useState([])
    const [eventData, setEventData] = useState([])
    const [locationData, setLocationData] = useState([])
    const defaultValues = {
        Name: "",
        PhoneNumber: "",
        Event_date: "",
        E_Location: "",
        Event_type: "",
        valPartner: "",
        CreatedBy: "",
        IsPremiumLead: false,
    }

    const schema = yup.object().shape({
        Name: yup.string().required(),
        PhoneNumber: yup.string().matches(/^[0-9]{10}$/).required(),
        Event_date: yup.string().required(),
        E_Location: yup.string().required(),
        Event_type: yup.string().required(),
        valPartner: yup.string().required(),
        CreatedBy: yup.string(),
        IsPremiumLead: yup.boolean().required(),
    });

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({ mode: 'onChange', resolver: yupResolver(schema), defaultValues: defaultValues});

    useEffect(() => {
        getLocationData()
        getEventData()
        getPartnerData()
    }, [])

    const getEventData = () => {
        let obj = { valEid:1, ValCase:"A" }
        ApiHelper.post(GETEVENTS, obj).then(({data}) => {
            if (data?.data?.length > 0) {
                setEventData(data.data)
            }
        }).catch(err => {
            console.log('err: ', err);
        })
    }

    const getPartnerData = () => {
        let obj = { valPid:1, ValCase:"A" }
        ApiHelper.post(GETSERVERPARTNER, obj).then(({data}) => {
            if (data?.data?.length > 0) {
                setPartnerData(data.data)
            }
        }).catch(err => {
            console.log('err: ', err);
        })
    }

    const getLocationData = () => {
        let obj = { valLid:1, ValCase:"A" }
        ApiHelper.post(GETLOCATION, obj).then(({data}) => {
            if (data?.data?.length > 0) {
                setLocationData(data.data)
            }
        }).catch(err => {
            console.log('err: ', err);
        })
    }

    const submitHandler = (obj) => {
        ApiHelper.post(LEADENTRYINSERT, obj).then(({data}) => {
            console.log('LEADENTRYINSERT : ', data);
            if (data?.status == 200) {
                alert(data?.message)
                reset(defaultValues)
            } else if (data?.message) {
                alert(data?.message)
            }
        }).catch(err => {
            console.log('err: ', err);
        })
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-12 col-lg-8'>
                    <div className='card shadow border-0 py-4'>
                        <h1 className='heading-text'>Lead Entry</h1>

                        <div className='row lead-form-container'>
                            <div className='col-12'>
                                <TextField
                                    label="Guest Name"
                                    name="Name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    {...register('Name')}
                                />
                                {errors.Name && <span className='error-field'>{ErrorMessages?.inputField}</span>}
                            </div>

                            <div className='col-6'>
                                <TextField
                                    label="Guest Number"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    {...register('PhoneNumber')}
                                />
                                {errors.PhoneNumber && <span className='error-field'>{ErrorMessages?.numberField}</span>}
                            </div>
                            <div className='col-6'>
                                <TextField
                                    label="Event Date"
                                    name="Event_date"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    {...register('Event_date')}
                                />
                                {errors.Event_date && <span className='error-field'>{ErrorMessages?.inputField}</span>}
                            </div>
                            <div className='col-6'>
                                <FormControl fullWidth className='mt-3'>
                                    <InputLabel htmlFor="Location">Location</InputLabel>
                                    <Controller
                                        control={control}
                                        name="E_Location"
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                label="Server Location"
                                                id="Location"
                                                value={value}
                                                onChange={e => {
                                                    onChange(e)
                                                }}
                                            >
                                                <em>Server Location</em>
                                                {locationData?.map((item) => (
                                                <MenuItem key={item.valLid} value={item.val}>
                                                    {item.txt}
                                                </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                                {errors.E_Location && <span className='error-field'>{ErrorMessages?.inputField}</span>}
                            </div>
                            <div className='col-6'>
                                <FormControl fullWidth className='mt-3'>
                                    <InputLabel htmlFor="Event Type">Event Type</InputLabel>
                                    <Controller
                                        control={control}
                                        name="Event_type"
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                label="Server Event Type"
                                                id="Event Type"
                                                value={value}
                                                onChange={e => {
                                                    onChange(e)
                                                }}
                                            >
                                                <em>Server Event Type</em>
                                                {eventData?.map((item) => (
                                                <MenuItem key={item.valEid} value={item.val}>
                                                    {item.txt}
                                                </MenuItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                                {errors.Event_type && <span className='error-field'>{ErrorMessages?.inputField}</span>}
                            </div>
                            <div className='col-6'>
                                <FormControl fullWidth className='mt-3'>
                                    <InputLabel htmlFor="Partner">Server Partner</InputLabel>
                                    <Controller
                                        control={control}
                                        name="valPartner"
                                        render={({ field: { onChange, value } }) => (
                                                <Select
                                                    label="Server Partner"
                                                    id="Partner"
                                                    value={value}
                                                    onChange={e => {
                                                        onChange(e)
                                                    }}
                                                >
                                                    <em>Server Partner</em>
                                                    {partnerData?.map((item) => (
                                                        <MenuItem key={item.valPid} value={item.val}>
                                                            {item.txt}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                        )}
                                    />
                                </FormControl>
                                {errors.valPartner && <span className='error-field'>{ErrorMessages?.inputField}</span>}
                            </div>
                            <div className='col-6 mt-3'>
                                <FormControlLabel
                                    name="IsPremiumLead"
                                    control={
                                        <Controller
                                        control={control}
                                        name="IsPremiumLead"
                                        render={({ field: { onChange, value } }) => (
                                            <Checkbox
                                            checked={value}
                                            onChange={e => {
                                                onChange(e)
                                            }}
                                            />
                                        )}
                                    />
                                        
                                    }
                                    label="Premium Lead"
                                    margin="normal"
                                    variant="outlined"
                                    />
                            </div> 
                            <div className='row my-3'>
                                <div className='d-grid gap-2 col-8 mx-auto'>
                                    <button className='btn btn-primary btn-full' onClick={(e) => handleSubmit(submitHandler)(e)}>SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(LeadAdd)