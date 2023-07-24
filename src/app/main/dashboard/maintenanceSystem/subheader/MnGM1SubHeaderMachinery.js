import { motion } from 'framer-motion'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAp } from '../store/apSlice'
import dayjs from 'dayjs'
import { Typography, colors } from '@mui/material'

import ChartWo from '../tabs/widget/ChartWo'
import LastApUser from '../tabs/widget/LastApUser'
import SummaryWo from '../tabs/widget/SummaryWo'

function MnGM1SubHeaderMachinery() {
    const data = useSelector(selectAp)

    const selectDep_no = [
        'PDHD1',
        'PDHD2',
        'PDHD3',
        'PDHD4',
        'PDRL1',
        'PDRL2',
        'PDMC1',
        'PDMC3',
        'PDMR1',
        'PDNC1',
        'PDNT1',
        'PDHB1',
        'PDTR1',
        'PDPU1',
        'PCGD1',
    ]

    const eko = ['PDHD1', 'PDHD2', 'PDHD3', 'PDHD4', 'PDRL1', 'PDRL2']

    const didi = ['PDMC1', 'PDMC3', 'PDMR1', 'PDNC1', 'PDNT1', 'PDHB1']

    const ahri = ['PDTR1', 'PDPU1', 'PCGD1']

    const filterData =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(selectDep_no, val.dep_no) &&
                    val.com_no == '01' &&
                    val.chk_mark != 'C'
                ) {
                    if (
                        _.includes(val.mch_no, 'GS') ||
                        _.includes(val.mch_no, 'HS') ||
                        _.includes(val.mch_no, 'CR') ||
                        _.includes(val.mch_no, 'AD') ||
                        _.includes(val.mch_no, 'KM') ||
                        _.includes(val.mch_no, 'LS') ||
                        val.mch_no == '-' ||
                        _.isNull(val.mch_no)
                    ) {
                    } else {
                        return val
                    }
                }
            })
            .sortBy(['s_ymd'])
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    workshop: _.countBy(items, (val) =>
                        val.pri_no == '04' ? 'pass' : 'fail'
                    ),
                    work_order: _.countBy(items, (val) =>
                        val ? 'pass' : 'fail'
                    ),
                    audit: _.countBy(items, (val) =>
                        val.chk_mark == 'Y' ? 'pass' : 'fail'
                    ),
                    breakdown_audit: _.countBy(items, (val) =>
                        val.pri_no == '01' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    still_run_audit: _.countBy(items, (val) =>
                        val.pri_no == '02' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    preventive_audit: _.countBy(items, (val) =>
                        val.pri_no == '03' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    workshop_audit: _.countBy(items, (val) =>
                        val.pri_no == '04' && val.chk_mark == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                }
            })
            .value()

    const listItemBenyamin =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(selectDep_no, val.dep_no) &&
                    val.com_no == '01' &&
                    val.chk_mark != 'C'
                ) {
                    if (
                        _.includes(val.mch_no, 'GS') ||
                        _.includes(val.mch_no, 'HS') ||
                        _.includes(val.mch_no, 'CR') ||
                        _.includes(val.mch_no, 'AD') ||
                        _.includes(val.mch_no, 'KM') ||
                        _.includes(val.mch_no, 'LS') ||
                        val.mch_no == '-' ||
                        _.isNull(val.mch_no)
                    ) {
                    } else {
                        return val
                    }
                }
            })
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: _.filter(items, (val) => {
                        if (val.chk_mark == 'N' || val.chk_mark == 'Y') {
                            return val
                        }
                    }),
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    workshop: _.countBy(items, (val) =>
                        val.pri_no == '04' ? 'pass' : 'fail'
                    ),
                    naudit: _.countBy(items, (val) =>
                        val.chk_mark == 'N' ? 'pass' : 'fail'
                    ),
                }
            })
            .value()

    const listItemDidi =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(didi, val.dep_no) &&
                    val.com_no == '01' &&
                    val.mch_no != '-' &&
                    !_.isNull(val.mch_no) &&
                    val.chk_mark != 'C'
                ) {
                    return val
                }
            })
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: _.filter(items, (val) => {
                        if (val.chk_mark == 'N' || val.chk_mark == 'Y') {
                            return val
                        }
                    }),
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    naudit: _.countBy(items, (val) =>
                        val.chk_mark == 'N' ? 'pass' : 'fail'
                    ),
                }
            })
            .value()

    const listItemAhri =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(ahri, val.dep_no) &&
                    val.com_no == '01' &&
                    val.mch_no != '-' &&
                    !_.isNull(val.mch_no) &&
                    val.chk_mark != 'C'
                ) {
                    return val
                }
            })
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: _.filter(items, (val) => {
                        if (val.chk_mark == 'N' || val.chk_mark == 'Y') {
                            return val
                        }
                    }),
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    naudit: _.countBy(items, (val) =>
                        val.chk_mark == 'N' ? 'pass' : 'fail'
                    ),
                }
            })
            .value()

    const listItemEko =
        data &&
        _.chain(data)
            .filter((val) => {
                if (
                    _.includes(eko, val.dep_no) &&
                    val.com_no == '01' &&
                    val.mch_no != '-' &&
                    !_.isNull(val.mch_no) &&
                    val.chk_mark != 'C'
                ) {
                    return val
                }
            })
            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
            .mapValues((items) => {
                return {
                    data: _.filter(items, (val) => {
                        if (val.chk_mark == 'N' || val.chk_mark == 'Y') {
                            return val
                        }
                    }),
                    breakdown: _.countBy(items, (val) =>
                        val.pri_no == '01' ? 'pass' : 'fail'
                    ),
                    still_run: _.countBy(items, (val) =>
                        val.pri_no == '02' ? 'pass' : 'fail'
                    ),
                    preventive: _.countBy(items, (val) =>
                        val.pri_no == '03' ? 'pass' : 'fail'
                    ),
                    naudit: _.countBy(items, (val) =>
                        val.chk_mark == 'N' ? 'pass' : 'fail'
                    ),
                }
            })
            .value()

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

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-16 w-full min-w-0 p-24"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.breakdown,
                        title: `Machinery ${dayjs().format('MMMM')}`,
                        name: `AP Sheet Breakdown`,
                        colorHg: colors.red[400],
                        colorLw: colors.red[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterData[dayjs().format('MMMM')]
                                ?.breakdown_audit,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.still_run,
                        title: `Machinery ${dayjs().format('MMMM')}`,
                        name: `AP Sheet Still Run`,
                        colorHg: colors.orange[400],
                        colorLw: colors.orange[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterData[dayjs().format('MMMM')]
                                ?.still_run,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <SummaryWo
                    data={{
                        count: filterData[dayjs().format('MMMM')]?.preventive,
                        title: `Machinery ${dayjs().format('MMMM')}`,
                        name: `AP Sheet Preventive`,
                        colorHg: colors.green[400],
                        colorLw: colors.green[300],
                        extra: {
                            name: 'Total Audit',
                            count: filterData[dayjs().format('MMMM')]
                                ?.preventive_audit,
                        },
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-6">
                <Typography className="text-md" color="text.secondary">
                    PDHD1 PDHD2 PDHD3 PDHD4 PDRL1 PDRL2 PDMC1 PDMC3 PDMR1 PDNC1
                    PDNT1 PDHB1 PDTR1 PDPU1
                </Typography>
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItemBenyamin,
                        user: 5,
                        leader: 'Kasie Maintenance',
                    }}
                />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-4">
                <ChartWo data={{ filterData }} />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItemEko,
                        user: 4,
                        leader: 'TL Forming - Rolling',
                    }}
                />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItemAhri,
                        user: 7,
                        leader: 'TL HT - Turret',
                    }}
                />
            </motion.div>
            <motion.div variants={item} className="sm:col-span-2 md:col-span-2">
                <LastApUser
                    data={{
                        listItemMonth: listItemDidi,
                        user: 6,
                        leader: 'TL MC - CNC - HB',
                    }}
                />
            </motion.div>
        </motion.div>
    )
}

export default MnGM1SubHeaderMachinery