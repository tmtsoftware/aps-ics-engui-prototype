/**
 * Created by smichaels on 6/23/17.
 */
import React from 'react';

const TelemetryListItem = ({source, fieldName, fieldValue, fieldUnits}) => {


    return (

        <tr>
            <td>{source}</td>
            <td>{fieldName}</td>
            <td>{fieldValue}</td>
            <td>{fieldUnits}</td>
        </tr>

    );

};

export default TelemetryListItem;