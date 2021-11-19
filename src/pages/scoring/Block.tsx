import React, { FC, ReactElement, useState } from 'react'
import { addThemeComponent, Box, Button, Column, Filler, Icon, Row, Text, Types } from 'react-nails'
import styled, { css } from 'styled-components'

addThemeComponent((theme: any) => ['block', {
    backgroundColor: theme.palette.white,
    borderRadius: theme.controls.borderRadius,
    labelTextColor: theme.palette.grey4,
    dataTextColor: theme.colors.textColor,
    subHeaderTextColor: theme.colors.textColor,
    content: {
        backgroundColor: theme.colors.contentBackground,
    },
},], 100)

export const BlockContainer = styled(Box)`
    border-radius: 2px;
    border-color: grey;
    background-color: white;
    box-shadow: 0 0 3px 0px rgba(0,0,0,0.1);
    width: 100%;
    ${(p: any) => p.stretch && css`
        height: 100%;
    `}
`

const BlockHeaderContainer = styled(Box).attrs(() => ({
    space: 'large',
}))`
    font-size: 16px;
    font-weight: bolder;
    border-bottom: 1px solid grey;
    ${(p: any) => p.noVerticalPadding && css`
        padding-top: 0;
        padding-bottom: 0;
    `}

    ${(p: any) => p.noRightPadding && css`
        padding-right: 0;
    `}
`

const BlockHeaderIcon = styled(Icon)`
    font-size: 0.8666em;
    color: #99A1A8;
`

const BlockGroupRow = styled(Row).attrs(() => ({
    space: 'medium',
}))`
    padding-right: 1.25em;
    ${(p: any) => p.noPadding && css`
        padding: 0;
    `}
`

const BlockLabel = styled(Text)`
    color: #99A1A8;
`

const BlockLabelSecondary = styled(Text)`
    font-size: 0.8666em;
    color: #99A1A8;
`

const BlockData = styled(Text).attrs((attrs) => ({ textAlign: attrs.textAlign || 'right', }))`
    color: #1b2025;
    word-break: break-word;
`

const BlockGroup = styled(Column).attrs(() => ({
    space: 'medium',
}))`
    width: 100%;
    padding-left: ${(p: any) => (p.noLeftPadding ? '0' : '0.8em')};
    padding-right: 0;
    ${(p: any) => p.noBottomPadding && css`
        padding-bottom: 0;
    `}

    ${(p: any) => p.noPadding && css`
        padding: 0;
    `}

    & > * {
        border-bottom: 1px solid grey;

        &:last-child {
            border-bottom: 0 none;
        }
    }
`

const BlockContent = styled.div`
    padding: 0.5em 11.2px;
    background-color: rgb(242,243,245);

    ${(p: any) => p.noRightPadding && css`
        padding-right: 0;
    `}

    & > ${BlockGroup} {
        padding-left: 0;
        padding-right: 0;
    }
`

const BlockSubHeader = styled.div`
    font-weight: bolder;
    font-size: 15px;
    color: #1b2025;
    margin-top: 0.8em;
`

interface IBlockHeader {
    icon?: string
    label?: ReactElement | string
    noVerticalPadding?: boolean
    noRightPadding?: boolean
}

const BlockHeader: FC<any> = ({ icon, label, children, ...rest }) => (
    <BlockHeaderContainer {...rest}>
        <Row>
            <Filler>
                <Row itemSpace={Types.SpacingType.Medium}>
                    {icon && (
                        <BlockHeaderIcon icon={icon} />
                    )}
                    {label}
                </Row>
            </Filler>
            {children}
        </Row>
    </BlockHeaderContainer>
)

const Block = (props: any) => (
    <BlockContainer {...props} />
)

Block.Header = BlockHeader
Block.SubHeader = BlockSubHeader
Block.Group = BlockGroup
Block.Row = BlockGroupRow
Block.Label = BlockLabel
Block.LabelSecondary = BlockLabelSecondary
Block.Data = BlockData
Block.Content = BlockContent

export default Block

export const BlockLabelDataRow = ({ label, children, }: any) => (
    <Block.Row>
        <Filler>
            <Block.Label>
                {label}
            </Block.Label>
        </Filler>
        <Block.Data>
            {children}
        </Block.Data>
    </Block.Row>
)

const ClickHeader = styled(Block.Header)`
    cursor: pointer;
`

const CollapseChildContainer = styled.div`
    display: ${(p: any) => (p.isCollapsed ? 'none' : 'block')};
`

export const CollapseBlock = ({ header, initialCollapse = false, onToggle = (e: any) => null, children, }: any) => {
    const [collapse, setCollapse,] = useState<any>(initialCollapse)

    const onToggleGroup = (newCollapse: any) => {
        setCollapse(newCollapse)
        if (!newCollapse) {
            onToggle(newCollapse)
        }
    }
    return (
        <Block>
            <ClickHeader
                label={(
                    <Row itemSpace={Types.SpacingType.Large}>
                        <Button icon={collapse ? 'caret-right' : 'caret-down'} />
                        {header}
                    </Row>
                )} onClick={() => { onToggleGroup(!collapse) }} />
            <CollapseChildContainer>
                {children}
            </CollapseChildContainer>
        </Block>
    )
}

export const CollapseStatusBlock = ({
    header, statusBag, statusDate, initialCollapse, onToggle, children,
    processingStateId, statusShowText = false,
}: any) => (
    <CollapseBlock
        header={(
            <Box width="35%">
                {header}
            </Box>
        )} onToggle={onToggle} initialCollapse={initialCollapse}>
        {children}
    </CollapseBlock>
)

export const CloseableBlock = ({ header, initialClosed = false, onToggle = (e: any) => null, children, }: any) => {
    const [closed, setClosed,] = useState(initialClosed)

    const onToggleGroup = (newClosed: any) => {
        setClosed(newClosed)
        if (!newClosed) {
            onToggle(newClosed)
        }
    }

    return (
        <Block>
            <Block.Header noVerticalPadding noRightPadding>
                <Row itemSpace={Types.SpacingType.Large}>
                    <Filler>
                        {header}
                    </Filler>
                </Row>
            </Block.Header>
            {!closed && children}
        </Block>
    )
}