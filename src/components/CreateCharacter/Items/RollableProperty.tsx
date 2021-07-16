import React, { useEffect, useState } from 'react';
import { iItemModel, RollableProperty } from 'src/models/items';
interface RollableRowProps {
    rollableProps: RollableProperty;
    index: number;
    setItem: (item: React.SetStateAction<iItemModel>) => void;
}
const RollableEditRow: React.FC<RollableRowProps> = ({ rollableProps, setItem, index }) => {
    const { name, magnitude, magnitudeType } = rollableProps;
    const onRemoveClick = () => {
        setItem((i: iItemModel) => {
            const wp = i.rollableProps || [];

            return {
                ...i,
                rollableProps: wp.filter((rp, i) => index !== i),
            };
        });
    };

    return (
        <div className='rollable-row'>
            <div id='rr-name'>{name}</div>
            <div id='rr-dice'>{magnitude}</div>
            <div id='rr-type'>{magnitudeType}</div>
            <div id='rr-trash'>
                <i className='fas fa-trash-alt hoverable color-off-primary-hover' onClick={onRemoveClick}></i>
            </div>
        </div>
    );
};
interface ItemFormProps {
    item: iItemModel;
    setItem: (item: React.SetStateAction<iItemModel>) => void;
}

const RollableEditForm: React.FC<ItemFormProps> = ({ item, setItem }) => {
    const initialValues = {
        name: '',
        magnitude: '',
        magnitudeType: '',
    };
    const [rpVals, setRpVals] = useState(initialValues);

    const clearRefs = () => {
        setRpVals(initialValues);
    };
    const getPropsFromRefs = () => {
        return rpVals as RollableProperty;
    };

    const onAddClick = () => {
        setItem((i: iItemModel) => {
            const wps: RollableProperty[] = i.rollableProps || [];
            return { ...i, rollableProps: [...wps, getPropsFromRefs()] };
        });
        clearRefs();
    };

    return (
        <div className='rp-form'>
            <div id='rp-name'>
                <input type='text' value={rpVals.name} onChange={(e) => setRpVals((v) => ({ ...v, name: e.target.value }))} placeholder='Name' />
            </div>
            <div id='rp-dice'>
                <input type='text' value={rpVals.magnitude} onChange={(e) => setRpVals((v) => ({ ...v, magnitude: e.target.value }))} placeholder='Dice' />
            </div>
            <div id='rp-type'>
                <input type='text' value={rpVals.magnitudeType} onChange={(e) => setRpVals((v) => ({ ...v, magnitudeType: e.target.value }))} placeholder='Type' />
            </div>
            <div id='rp-add'>
                <i className='far fa-plus-square hoverable' onClick={onAddClick}></i>
            </div>
        </div>
    );
};

export const RollablePropertyForm: React.FC<ItemFormProps> = (props) => {
    const { item } = props;
    const { rollableProps: weaponProps } = item;
    const [rows, setRows] = useState<JSX.Element[]>([]);
    useEffect(() => {
        if (!weaponProps || weaponProps === undefined) return;
        const r = weaponProps.map((rp, index) => <RollableEditRow setItem={props.setItem} rollableProps={rp} index={index} key={index} />);
        setRows(r);
    }, [weaponProps, props.setItem]);
    return (
        <div className='rollable-property'>
            <div className='form'>
                <RollableEditForm {...props} />
            </div>
            <div className='list'>{rows}</div>
        </div>
    );
};
