import * as React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListSubheader from '@mui/material/ListSubheader'
import Popper from '@mui/material/Popper'
import { useTheme, styled } from '@mui/material/styles'
import { VariableSizeList } from 'react-window'
import Typography from '@mui/material/Typography'

const LISTBOX_PADDING = 8 // px

function renderRow(props) {
    const { data, index, style } = props

    const dataSet = data[index]
    const inlineStyle = {
        ...style,
        top: style.top + LISTBOX_PADDING,
    }

    if (dataSet.hasOwnProperty('group')) {
        return (
            <ListSubheader
                key={dataSet.key}
                component="div"
                style={inlineStyle}
            >
                {dataSet.group}
            </ListSubheader>
        )
    }

    return (
        <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
            {`${dataSet[1]}`}
        </Typography>
    )
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext)
    return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data) {
    const ref = React.useRef(null)
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true)
        }
    }, [data])
    return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref
) {
    const { children, ...other } = props
    const itemData = []
    children.forEach((item) => {
        itemData.push(item)
        itemData.push(...(item.children || []))
    })
    // console.log(itemData)

    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    })
    const itemCount = itemData.length
    const itemSize = smUp ? 36 : 48

    const getChildSize = (child) => {
        if (child.hasOwnProperty('group')) {
            return 48
        }

        return itemSize
    }

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
    }

    const gridRef = useResetCache(itemCount)

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    )
})

ListboxComponent.propTypes = {
    children: PropTypes.array,
}

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
})

export default function VirtualizedData({ field, data }) {
    const getData = data.map((x) => {
        return x.mat_name || x.item_name
    })
    // console.log({ field })

    return (
        <Autocomplete
            id="virtualize-demo"
            sx={{ width: '100%' }}
            className="mt-8 mb-16"
            disableListWrap
            PopperComponent={StyledPopper}
            onChange={(event, value) => {
                field.onChange(value)
            }}
            value={field.value}
            ListboxComponent={ListboxComponent}
            options={!data ? ['Loading..'] : getData}
            groupBy={(option) => option[0].toUpperCase()}
            renderInput={(params) => (
                <TextField {...params} label="Sparepart" />
            )}
            renderOption={(props, option, state) => [
                props,
                option,
                state.index,
            ]}
            slotProps={{
                popper: {
                    disablePortal: true,
                },
            }}
            // TODO: Post React 18 update - validate this conversion, look like a hidden bug
            renderGroup={(params) => params}
        />
    )
}
