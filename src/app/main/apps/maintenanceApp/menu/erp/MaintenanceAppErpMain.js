import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'

import DataChart from '../../components/DataChart'
import ListWorkOrder from '../../components/ListWorkOrder'
import MaintenanceAppErpKanban from './MaintenanceAppErpKanban'
import CardAvatar from '../../components/CardAvatar'
import { selectMnUsers } from '../../store/userStore/userMnSlices'
import {
    filterChartErps,
    filteredErpsByMonth,
} from '../../store/erpStore/erpMnSlices'
import {
    machinesCom,
    machinesResponbility,
    machinesSection,
} from '../../store/machineStore/machineMnSlices'

const container = {
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

function MaintenanceAppErpMain() {
    const [useCom, useResponsible, useSection, useUser, filteredData] = [
        useSelector(machinesCom),
        useSelector(machinesResponbility),
        useSelector(machinesSection),
        useSelector(selectMnUsers),
        useSelector(filteredErpsByMonth),
    ]
    const [withUser, setWithUser] = useState(null)
    const [withParams, setWithParams] = useState(null)

    useEffect(() => {
        const user = _.find(useUser, (val) => {
            if (_.toLower(val.displayName) == _.toLower(useResponsible))
                return val
        })

        if (_.isUndefined(user)) {
            if (useCom === 'ALL') {
                setWithUser(_.find(useUser, { id: 10 }))
            } else {
                if (useCom === 'GM2') {
                    if (useSection === 'workshop') {
                        setWithUser(_.find(useUser, { id: 33 }))
                    } else {
                        setWithUser(_.find(useUser, { id: 8 }))
                    }
                } else if (useCom === 'GM1') {
                    if (useSection === 'workshop') {
                        setWithUser(_.find(useUser, { id: 17 }))
                    } else {
                        setWithUser(_.find(useUser, { id: 5 }))
                    }
                } else if (useCom !== 'GM1' && useCom !== 'GM2') {
                    if (useSection === 'workshop') {
                        setWithUser(_.find(useUser, { id: 17 }))
                    } else {
                        setWithUser(_.find(useUser, { id: 39 }))
                    }
                }
            }
        } else {
            setWithUser(user)
        }

        setWithParams(filteredData)
    }, [useCom, useSection, useResponsible, useUser, filteredData])

    const filterChart = useSelector(filterChartErps)

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 gap-16 w-full min-w-0 pt-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                {!_.isNull(withUser) && (
                    <CardAvatar
                        user={withUser}
                        params={withParams}
                        section="work orders"
                    />
                )}
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-3">
                <ListWorkOrder />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-4 md:col-span-5">
                <DataChart params={{ data: filterChart }} />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-6 md:col-span-8">
                <MaintenanceAppErpKanban />
            </motion.div>
        </motion.div>
    )
}

export default MaintenanceAppErpMain
