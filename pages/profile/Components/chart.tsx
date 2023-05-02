import { useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Chartprofile(props: any) {
    const graphData = useMemo(() => {
        return props.data;
    }, [props.data]);
    return (
        <ResponsiveContainer width={'100%'} height={300}>
            <LineChart data={graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="no"
                    label={{ value: 'Question', position: 'insideBottomRight', offset: -20 }} />
                <YAxis dataKey="ability_measure" type='number' domain={[0.1 , 4]}
                    label={{ value: 'Ability Measure', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quiz_level" stroke="#8884d8" />
                <Line type="monotone" dataKey="ability_measure" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    )
    
}