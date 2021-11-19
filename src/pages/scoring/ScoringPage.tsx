import React, { useCallback, useMemo, useState } from 'react'
import { Box, Column, Icon, Row, Types } from "react-nails"
import Block from './Block'
import mockData from './mockData'
import { addIcon } from 'react-nails'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
addIcon(faThumbsDown)
addIcon(faThumbsUp)

type PriceType = {
    total: number
    perNight: number
    currency: string
}

type ImageType = {
    url: string
    name?: string
}

type ScoringType = {
    id: string
    externalUrl: string
    name: string
    price: PriceType
    images?: ImageType[]
}

const ScoringPage = () => {
    const [voting, setVoting] = useState<any>({})

    const onVote = useCallback((data: ScoringType, crement: string) => {
        let votingData = voting[data.id]
        if (votingData === undefined) {
            votingData = { count: 0, name: data.name }
        }

        let newCount: number
        if (crement === 'down') {
            newCount = votingData.count - 1
        } else {
            newCount = votingData.count + 1
        }
        setVoting({ ...voting, [data.id]: { ...votingData, count: newCount } })
    }, [voting, setVoting])


    const scoringData: ScoringType[] = useMemo(() => {
        return mockData
    }, [])

    return (
        <>
            <Column lineSpace={Types.SpacingType.Large}>
                {scoringData.map((data, idx) =>
                (
                    <Block key={idx}>
                        <Block.Header label={<a target="_blank" href={data.externalUrl} rel="noopener noreferrer">{data.name} </a>}>
                            <Box>
                                <Row itemSpace={Types.SpacingType.Large}>
                                    <Icon icon="thumbs-down" onClick={() => onVote(data, 'down')} />
                                    <Icon icon="thumbs-up" onClick={() => onVote(data, 'up')} />
                                </Row>
                            </Box>
                        </Block.Header>
                        <Block.Content>
                            {data.images?.map((image, idx) => (
                                <Box key={idx}>
                                    <img
                                        width="300px"
                                        src={image.url}
                                        alt="new"
                                    /></Box>
                            ))}
                            <Box textAlign={Types.TextAlignType.Right}>
                                <Box>pro Nacht: {data.price.perNight} {data.price.currency}</Box>
                                <hr />
                                <Box>Gesamtbetrag: {data.price.total} {data.price.currency}</Box>
                            </Box>
                        </Block.Content>
                    </Block>
                ))}
            </Column>
            <br />
            <br />
            <Column>
                Auswertung:
                <Box>
                    {voting && Object.keys(voting).map((id, idx) => (
                        <Box key={idx}>{voting[id].name}: {voting[id].count}</Box>
                    ))}
                </Box>
            </Column>
        </>
    )
}

export default ScoringPage