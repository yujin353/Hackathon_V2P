import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { MuiRail, MuiHandle, MuiTrack, MuiTick } from "./components"; 

const CompoundSlider = ({ setRating }) => {
    const [domain,] = useState([1, 5])
    const [values, setValues] = useState([3])
    useEffect(() => {
        setRating(values[0])
    })

    return (
        <Grid container>
            <Grid item xs={12}>
                <div style={{ margin: "5% 5% 10% 5%", height: 10, width: "90%" }}>
                    <Slider
                        mode={2} step={1} domain={domain}
                        rootStyle={{ position: "relative", width: "100%" }}
                        onChange={(e)=>setValues(e)} values={values}>
                        <Rail>
                            {({ getRailProps }) => <MuiRail getRailProps={getRailProps} />}
                        </Rail>
                        <Handles>
                            {({ handles, getHandleProps }) => (
                                <div className="slider-handles">
                                    {handles.map(handle => (
                                        <MuiHandle key={handle.id} handle={handle} domain={domain} getHandleProps={getHandleProps}/>
                                    ))}
                                </div>
                            )}
                        </Handles>
                        <Tracks left={true} right={false}>
                            {({ tracks, getTrackProps }) => (
                                <div className="slider-tracks">
                                    {tracks.map(({ id, source, target }) => (
                                        <MuiTrack key={id} source={source} target={target} getTrackProps={getTrackProps}/>
                                    ))}
                                </div>
                            )}
                        </Tracks>
                        <Ticks count={5}>
                            {({ ticks }) => (
                                <div className="slider-ticks">
                                    {ticks.map(tick => (
                                        <MuiTick key={tick.id} tick={tick} count={ticks.length} />
                                    ))}
                                </div>
                            )}
                        </Ticks>
                    </Slider>
                </div>
            </Grid>
        </Grid>
    )
}

export default CompoundSlider;