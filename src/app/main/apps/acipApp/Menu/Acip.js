import FuseLoading from '@fuse/core/FuseLoading'
import FusePageSimple from '@fuse/core/FusePageSimple'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import { useEffect, useState, forwardRef } from 'react'
import { motion } from 'framer-motion'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import InputLabel from '@mui/material/InputLabel'
import { useSelector, useDispatch } from 'react-redux'

import {
    selectFilteredGenbas,
    setGenbasCom,
    setGenbasDept,
    setGenbasArea,
    setSearchText,
    setGenbasStatus,
    selectGenbasUseArea,
    selectGenbasUseCom,
    selectGenbasUseDept,
} from '../store/genba/genbaAcipSlices'

import AcipList from './AcipList'
import AcipDialog from './AcipDialog'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

function Acip() {
    const dispatch = useDispatch()
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [selectCom, selectDept, selectArea, selectFilter] = [
        useSelector(selectGenbasUseCom),
        useSelector(selectGenbasUseDept),
        useSelector(selectGenbasUseArea),
        useSelector(selectFilteredGenbas),
    ]
    const [loading, setLoading] = useState(true)
    const [dialogData, setDialogData] = useState(null)
    const [open, setOpen] = useState(false)
    const [comVal, setComVal] = useState('ALL')
    const [deptVal, setDeptVal] = useState('ALL')
    const [areaVal, setAreaVal] = useState('ALL')
    const [searchVal, setSearchVal] = useState('')
    const [statusVal, setStatusVal] = useState('Open')

    useEffect(() => {
        if (!selectFilter) {
            return
        }
        setLoading(false)
    }, [selectFilter])

    function handleComTab(event, value) {
        setComVal(value.props.value)
        dispatch(setGenbasCom(value.props.value))
    }

    function handleDeptTab(event, value) {
        setDeptVal(value.props.value)
        dispatch(setGenbasDept(value.props.value))
    }

    function handleAreaTab(event, value) {
        setAreaVal(value.props.value)
        dispatch(setGenbasArea(value.props.value))
    }

    function handleSearchText(event, value) {
        setSearchVal(event.target.value)
        dispatch(setSearchText(event.target.value))
    }

    function handleStatusTab(event, value) {
        setStatusVal(event.target.value)
        dispatch(setGenbasStatus(event.target.value))
    }

    function paramsId(data) {
        setOpen(true)
        setDialogData(data.row)
    }

    function handleClose(event, reason) {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false)
        }
    }

    if (loading) {
        return <FuseLoading />
    }

    return (
        <div>
            <FusePageSimple
                content={
                    <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
                        <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
                            <div className="flex items-center max-w-full">
                                <motion.div
                                    className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                                    initial={{ x: -20 }}
                                    animate={{
                                        x: 0,
                                        transition: { delay: 0.3 },
                                    }}
                                >
                                    <Typography className="text-16 sm:text-20 truncate font-semibold">
                                        Genba Acip 5R
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        className="font-medium"
                                    >
                                        Acip System | PT Garuda Metalindo.Tbk
                                    </Typography>
                                </motion.div>
                            </div>
                            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center justify-start space-y-16 sm:space-y-0 sm:space-x-16">
                                <TextField
                                    label="Search"
                                    placeholder="Search.."
                                    className="flex w-full sm:w-150 mx-8"
                                    value={searchVal}
                                    onChange={handleSearchText}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <FormControl
                                    className="flex w-full sm:w-150 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Plant</InputLabel>

                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        value={comVal}
                                        onChange={handleComTab}
                                    >
                                        {selectCom.map((val, index) => (
                                            <MenuItem value={val} key={index}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl
                                    className="flex w-full sm:w-150 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Dept</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        value={deptVal}
                                        onChange={handleDeptTab}
                                    >
                                        {selectDept.map((val, index) => (
                                            <MenuItem value={val} key={index}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl
                                    className="flex w-full sm:w-150 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Area</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        value={areaVal}
                                        onChange={handleAreaTab}
                                    >
                                        {selectArea.map((val, index) => (
                                            <MenuItem value={val} key={index}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl
                                    className="flex w-full sm:w-150 mx-8"
                                    variant="outlined"
                                >
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        label="Category"
                                        value={statusVal}
                                        onChange={handleStatusTab}
                                    >
                                        <MenuItem value="Open" key={1}>
                                            Open
                                        </MenuItem>
                                        <MenuItem value="Close" key={2}>
                                            Close
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {selectFilter.length > 0 ? (
                            <AcipList
                                params={selectFilter}
                                paramsId={paramsId}
                            />
                        ) : (
                            <div className="flex flex-1 items-center justify-center">
                                <Typography
                                    color="text.secondary"
                                    className="text-24 mt-32 my-32"
                                >
                                    N/A
                                </Typography>
                            </div>
                        )}
                    </div>
                }
                scroll={isMobile ? 'normal' : 'page'}
            />
            <Dialog
                open={open}
                maxWidth={'xl'}
                style={{ zIndex: 1000 }}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            Update Genba {dialogData?.sheet}
                        </Typography>

                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{ width: 900, height: 600, zIndex: 1000 }}>
                    <AcipDialog params={dialogData} />
                </div>
            </Dialog>
        </div>
    )
}

export default Acip
