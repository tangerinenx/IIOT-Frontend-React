// import i18next from 'i18next'
// import ar from './navigation-i18n/ar'
// import en from './navigation-i18n/en'
// import tr from './navigation-i18n/tr'
import { authRoles } from '../auth'

// i18next.addResourceBundle('en', 'navigation', en)
// i18next.addResourceBundle('tr', 'navigation', tr)
// i18next.addResourceBundle('ar', 'navigation', ar)

const navigationConfig = [
    // {
    //     id: 'dashboards',
    //     title: 'Dashboards',
    //     type: 'group',
    //     icon: 'heroicons-outline:home',
    //     translate: 'DASHBOARDS',
    //     children: [
    //         {
    //             id: 'dashboards.project',
    //             title: 'Maintenance System',
    //             type: 'item',
    //             auth: authRoles.admin,
    //             icon: 'heroicons-outline:clipboard-check',
    //             url: '/dashboards/maintenance',
    //         },

    //     ],
    // },
    // {
    //     type: 'divider',
    //     id: 'divider-2',
    // },
    {
        id: 'apps',
        title: 'Applications',
        type: 'group',
        icon: 'heroicons-outline:cube',
        translate: 'APPLICATIONS',
        children: [
            {
                id: 'apps.maintenanceAppErps',
                title: 'Work Order',
                type: 'item',
                icon: 'heroicons-outline:presentation-chart-bar',
                auth: authRoles.admin,
                url: '/apps/maintenanceApp/erps',
            },
            {
                id: 'apps.maintenanceAppInventories',
                title: 'Inventories',
                type: 'item',
                icon: 'heroicons-outline:shopping-cart',
                auth: authRoles.admin,
                url: '/apps/maintenanceApp/inventories',
            },
            {
                id: 'apps.maintenanceAppMachines',
                title: 'Machines',
                type: 'item',
                icon: 'heroicons-outline:desktop-computer',
                auth: authRoles.admin,
                url: '/apps/maintenanceApp/machines',
            },
            {
                id: 'apps.e3viewAppMachineInfo',
                title: '3View',
                type: 'item',
                icon: 'heroicons-outline:presentation-chart-bar',
                auth: authRoles.admin,
                url: '/apps/e3ivewApp/',
            },

            // {
            //     id: 'apps.maintenanceSystem',
            //     title: 'Maintenance Machine',
            //     type: 'item',
            //     icon: 'heroicons-outline:desktop-computer',
            //     auth: authRoles.admin,
            //     url: '/apps/maintenanceSystem',
            // },
            {
                id: 'dashboards.projectAcip',
                title: 'Acip System',
                type: 'item',
                auth: authRoles.acip,
                icon: 'heroicons-outline:clipboard-check',
                url: '/apps/acipApp/dashboard',
            },
            {
                id: 'apps.acipApp',
                title: 'Genba Acip',
                type: 'item',
                icon: 'heroicons-outline:desktop-computer',
                auth: authRoles.acip,
                url: '/apps/acipApp/acip',
            },
            {
                id: 'apps.scadaApp',
                title: 'Andon 3VIEW',
                type: 'item',
                auth: authRoles.user,
                icon: 'heroicons-outline:desktop-computer',
                url: '/apps/scadaApp/home',
            },
            {
                type: 'divider',
                id: 'divider-2',
            },

            {
                id: 'apps.pdApp',
                title: 'Production',
                type: 'item',
                icon: 'heroicons-outline:presentation-chart-bar',
                auth: authRoles.admin,
                url: '/apps/productionApp',
            },

            // {
            //     id: 'apps.modbus',
            //     title: 'Maintenance System',
            //     type: 'collapse',
            //     auth: authRoles.admin,
            //     icon: 'heroicons-outline:status-online',
            //     translate: 'IOT',
            //     children: [
            //         {
            //             id: 'modbusApp-mch',
            //             title: 'Home',
            //             type: 'item',
            //             url: '/apps/modbusApp',
            //             end: true,
            //         },
            //         {
            //             id: 'modbusApp-new-address',
            //             title: 'New address',
            //             type: 'item',
            //             url: 'apps/modbusApp/address/new',
            //         },
            //     ],
            // },
        ],
    },
]

export default navigationConfig
