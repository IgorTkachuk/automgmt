import React from 'react';
import { autoFieldList } from '../../utils/constants';

const DetailCar = (props) => {
    const { carForDetail } = props;
    const carId = Object.keys(carForDetail)[0];

    const fieldList = autoFieldList.map((field) => {
        return (
            <li key = { field.name }>
                {field.descr}:
                { carForDetail[carId][field.name] }
            </li>
        )
    });

    return (
        <ul>
            { fieldList }
        </ul>
    );
}

export default DetailCar;