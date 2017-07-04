import './Grid.css'
import {
    Button,
    Col,
    Grid as LayoutGrid,
    Row,
} from 'react-bootstrap'
import {
    colors,
    config,
} from '../config'
import GridRow from './GridRow'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'
import { shouldCapitalize } from '../helpers'

const Grid = ({
    activeAxis,
    activeElement,
    activeRow,
    characterGrid,
    clickButton,
    output,
    settings,
    showClearConfirm,
    suggestedWords,
}) => (
    <LayoutGrid
        className="Grid"
    >
        <Row>
            <Col
                xs={12}
            >
                {characterGrid.map((row, iteration, rows) => {
                    return (
                        <GridRow
                            clickButton={clickButton}
                            isActive={iteration === activeRow}
                            key={`row-${iteration}`}
                        >
                            {/* Do not add suggested words to last (punc) row */}
                            {_.uniqBy(row.concat(iteration >= rows.length - 2 ? [] : suggestedWords), word => word !== 'I' ? word.toLowerCase() : word).map((character, charIteration, characters) => {
                                // Do not allow duplicates apart from 'I' which can be with lower 'i'
                                const isActiveItem = activeAxis === 'col' && iteration === activeRow && charIteration === activeElement

                                let char = character
                                if(char === config.chars.clear && showClearConfirm) {
                                    char = 'Sure?'
                                }

                                return(
                                    <Button
                                        className={`GridItem${isActiveItem ? ' GridItem--is-active' : ''}${char === config.chars.capsLock && settings.capsLock ? ' GridItem--is-on' : ''}`}
                                        disabled={(char === config.chars.speedUp && !settings.canIncreaseSpeed) || (char === config.chars.speedDown && !settings.canDecreaseSpeed)}
                                        key={char}
                                        onClick={() => clickButton(character)}
                                        style={{
                                            backgroundColor: isActiveItem
                                                ? colors.bold
                                                : suggestedWords.indexOf(char) > -1
                                                    ? colors.midLightAnalogous
                                                    : colors.midLight,
                                            borderRadius: `${iteration === 0 && charIteration === 0 ? 4 : 0}px ${iteration === 0 && charIteration === characters.length - 1 ? 4 : 0}px ${iteration === rows.length - 1 && charIteration === characters.length - 1 ? 4 : 0}px ${iteration === rows.length - 1 && charIteration === 0 ? 4 : 0}px`,
                                            color: isActiveItem ? '#fff' : '#222',
                                            textTransform: settings.capsLock ? 'uppercase' : settings.autoCapitalize && shouldCapitalize(output, char) ? 'capitalize' : 'none',
                                        }}
                                    >
                                        {char}
                                    </Button>
                                )
                            })}
                        </GridRow>
                    )
                })}
            </Col>
        </Row>
    </LayoutGrid>
)

Grid.propTypes = {
    activeAxis: PropTypes.oneOf([
        'col',
        'row',
    ]).isRequired,
    activeElement: PropTypes.number.isRequired,
    activeRow: PropTypes.number.isRequired,
    characterGrid: PropTypes.array.isRequired,
    clickButton: PropTypes.func.isRequired,
    output: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    showClearConfirm: PropTypes.bool.isRequired,
    suggestedWords: PropTypes.array.isRequired,
}

export default Grid
