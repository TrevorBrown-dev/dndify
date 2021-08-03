import React, { Dispatch, useState } from 'react';
import { WikiReference } from 'src/components/misc/WikiReference';
import { useModal } from 'src/components/Modal';
import { CharacterProps, Section } from '..';
import { iItemModel, Rollable } from '../../../models/items';
import { ItemType, ItemTypes } from '../../../models/items/ItemType';
import { Rarities, Rarity } from '../../../models/items/Rarity';
import { ItemCard } from './ItemCard';
import { RollablePropertyForm } from './RollableProperty';
export const AddRPHeader = () => {
    const [toggleRpInfo, rpModal] = useModal(
        <>
            <p style={{ marginTop: '2em' }}>
                These are <em>Rollable Properties</em>. You can attach dice to your items and spells. These are predefined values for quick rolling.
            </p>
        </>
    );
    const handleQuestionClick = () => {
        toggleRpInfo();
    };
    return (
        <>
            {rpModal}
            <h5 style={{ color: '#1f1f1f', overflow: 'visible' }}>
                Add Rollable Property
                <i title={'Wiki Reference'} onClick={handleQuestionClick} className='far fa-question-circle info hoverable-half' style={{ position: 'relative', top: '.1em' }}></i>
            </h5>
        </>
    );
}
/*
    The item card should take in an item object and render its details.
    
    It should be displayed in a tiled-grid form similar to a equipment card
*/
const mapItemTypes = (): JSX.Element[] => {
    const els: JSX.Element[] = [];
    ItemTypes.forEach((key, index) => {
        els.push(
            <option key={index} value={index}>
                {key.name}
            </option>
        );
    });
    return els;
};

const mapRarityLevels = (): JSX.Element[] => {
    const els: JSX.Element[] = Rarities.map((rarity, index) => {
        return (
            <option key={index} value={index}>
                {rarity}
            </option>
        );
    });
    return els;
};

interface SelectProps {
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    defaultValue: string;
}
const SelectItemType: React.FC<SelectProps> = (props) => {
    return (
        <select value={props.defaultValue} onChange={props.onChange} name='item-type' id='item-type' style={{ width: '100%', height: '100%' }}>
            <option style={{ color: 'darkgray' }}>Chose a Type...</option>
            {mapItemTypes()}
        </select>
    );
};

const SelectRarity: React.FC<SelectProps> = (props) => {
    return (
        <select value={props.defaultValue} onChange={props.onChange} name='item-rarity' id='item-rarity' style={{ width: '100%', height: '100%' }}>
            <option style={{ color: 'darkgray' }}>Chose a Rarity...</option>
            {mapRarityLevels()}
        </select>
    );
};

const blankItem: iItemModel = {
    name: '',
    cost: '',
    description: '',
    weight: '',
    rarity: Rarity.COMMON,
    type: ItemType.WEAPON,
    rollableProps: [],
};
export const Items: React.FC<CharacterProps> = ({ character }) => {
    const [item, setItem] = useState<iItemModel>(blankItem);
    const renderItems = () => {
        return character.items.items.map((item, index) => {
            return <ItemCard character={character} item={item} key={index} />;
        });
    };

    const handleSubmit = () => {
        if (!item.name) return;
        character.items.addItem(item);
        setItem(blankItem);
    };

    return (
        <Section header='Items' id='items' title='Items' wikiReference='https://www.dndbeyond.com/equipment' icon='fas fa-swords'>
            <div className='create-sec-items'>
                <div className='item-form'>
                    <div id='name'>
                        <h3>
                            <input
                                type='text'
                                id='item-name'
                                placeholder='Name'
                                onChange={(e) =>
                                    setItem((i) => ({
                                        ...i,
                                        name: e.target.value,
                                    }))
                                }
                                value={item.name}
                            />
                        </h3>
                    </div>
                    <div id='rarity'>
                        <SelectRarity
                            defaultValue={`${item.rarity || ''}`}
                            onChange={(e) =>
                                setItem((i) => ({
                                    ...i,
                                    rarity: parseInt(e.target.value),
                                }))
                            }
                        />
                    </div>
                    <div id='type'>
                        <SelectItemType
                            defaultValue={`${item.type || ''}`}
                            onChange={(e) => {
                                console.log(e.target.value);
                                setItem((i) => ({
                                    ...i,
                                    type: parseInt(e.target.value),
                                }));
                            }}
                        />
                    </div>
                    <div id='weight'>
                        <input
                            type='text'
                            name='item-weight'
                            id='item-weight'
                            placeholder='Weight'
                            onChange={(e) =>
                                setItem((i) => ({
                                    ...i,
                                    weight: e.target.value,
                                }))
                            }
                            value={item.weight}
                        />
                    </div>
                    <div id='cost'>
                        <input
                            type='text'
                            name='item-cost'
                            id='item-cost'
                            onChange={(e) =>
                                setItem((i) => ({
                                    ...i,
                                    cost: e.target.value,
                                }))
                            }
                            placeholder='Cost'
                            value={item.cost}
                        />
                    </div>
                    <div id='desc'>
                        <textarea
                            placeholder='Description'
                            name='item-description'
                            id='item-description'
                            onChange={(e) =>
                                setItem((i) => ({
                                    ...i,
                                    description: e.target.value,
                                }))
                            }
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                padding: '1em',
                                resize: 'none',
                            }}
                            value={item.description}
                        ></textarea>
                    </div>
                    <div id='rollable-property'>
                        <AddRPHeader />
                        <RollablePropertyForm item={item} setItem={setItem as Dispatch<React.SetStateAction<Rollable>>} />
                    </div>
                    <div id='submit'>
                        <button
                            className='add-item'
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                            }}
                            onClick={(e) => handleSubmit()}
                        >
                            Add Item
                        </button>
                    </div>
                </div>
                <div className='item-cards-container'>
                    <fieldset className='item-cards'>
                        <legend>Items</legend>
                        {renderItems()}
                    </fieldset>
                </div>
            </div>
        </Section>
    );
};
