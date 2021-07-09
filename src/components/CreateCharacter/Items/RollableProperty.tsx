import { useCallback, useRef } from "react";
import { iItemModel, RollableProperty } from "src/models/items";
/*
! This page needs to be cleaned up
*/

interface RollableRowProps {
    rollableProps: RollableProperty,
    index: number;
    setItem: (item: React.SetStateAction<iItemModel>) => void
}
const RollableEditRow: React.FC<RollableRowProps> = ({ rollableProps, setItem, index }) => {
    const { name, magnitude, magnitudeType } = rollableProps;
    const onRemoveClick = () => {
        setItem((i: iItemModel) => {
            const weaponProps = i.weaponProps || [];
            console.log("OK WE HERE", i.weaponProps);
            return {
                ...i,
                 weaponProps: weaponProps.splice(index, 1),
                
            }
        })
    }

    return (
        <div className="rollable-row">
            <div id="name">{name}</div>
            <div id="dice">{magnitude}</div>
            <div id="type">{magnitudeType}</div> 
            <div id="trash"><i className="fas fa-trash-alt hoverable color-off-primary-hover" onClick={onRemoveClick}></i></div>
        </div>
    );
}
interface ItemFormProps {
    item: iItemModel;
    setItem: (item: React.SetStateAction<iItemModel>) => void;
}

/* 
! Why the fuck is this adding to the list twice
*/
const RollableEditForm: React.FC<ItemFormProps> = ({item, setItem}) => {
    const name = useRef<HTMLInputElement>(null);
    const magnitude = useRef<HTMLInputElement>(null);
    const magnitudeType = useRef<HTMLInputElement>(null);

    const clearRefs = () => {
        if(name.current)
            name.current.value = "";
        if(magnitude.current)
            magnitude.current.value = "";
        if(magnitudeType.current)
            magnitudeType.current.value = "";
    }
    const getPropsFromRefs = () => {
    const wp: RollableProperty = {
            name: name.current?.value || "",
            magnitude: magnitude.current?.value || "",
            magnitudeType: magnitudeType.current?.value || "",
        };
        return wp;
    }


    const onAddClick = () => {
        setItem((i: iItemModel) => {
            const wps: RollableProperty[] = i.weaponProps || [];
            return { ...i, weaponProps: [...wps, getPropsFromRefs()] }
        });
        clearRefs(); 
    }
    

    return (
        <div className="rp-form">
            <div id="rp-name"><input type="text" ref={name} placeholder="Name" /></div>
            <div id="rp-dice"><input type="text" ref={magnitude} placeholder="Dice" /></div>
            <div id="rp-type"><input type="text" ref={magnitudeType} placeholder="Type" /></div>
            <div id="rp-add"><i className="far fa-plus-square hoverable" onClick={onAddClick}></i></div>
        </div>
    );
}


export const RollablePropertyForm: React.FC<ItemFormProps> = (props) => {
    const { item } = props;

    const mapItems = useCallback(() => {
        return item.weaponProps?.map((rp, index) => <RollableEditRow rollableProps={rp} setItem={props.setItem} key={index} index={index} />) || "";
    }, [item.weaponProps])

    return (
        <div className="rollable-property">
            <div className="form">
                <RollableEditForm {...props} />
            </div>
            <div className="list">
                { mapItems() }
            </div>

        </div>
    );

}