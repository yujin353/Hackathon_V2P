import React, { useMemo } from 'react';
import ReactWordcloud from 'react-d3-cloud';

const setWordColor = (word) => {
    if (word.status === true) return 'blue';
    if (word.status === false) return 'red';
    return 'gray';
}

const Wordcloud = ({ productIngredients }) => {
    const len = productIngredients?.length - 1
    const wordSources = productIngredients?.map((item) => {
        const value = 15 + (30 * (len - (item.sequence - 1))/len) 
        return {
            text: item.name,
            value,
            ...item
        }
    })
    const wc = useMemo(() => {
        return <ReactWordcloud
        font="impact"
        data={wordSources}
        fontSize={(word) => word.value}
        rotate={0}
        padding={3}
        fill={setWordColor}
    />
    }, [productIngredients])
    return (
        <div style={{width: "auto", height: "auto"}}>
            {wc}
        </div>
    );
}

export default Wordcloud;