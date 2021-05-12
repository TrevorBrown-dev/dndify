import { useCallback, useState } from 'react';
export interface iStatModel {
    name: string;
    short_name?: string;
    value: number;
}

export interface iStats {
    stats: iStatModel[];
    modifier: (index: string) => number;
    setValue: (incomingStat: iStatModel) => void;
    deserialize: (stats: iStatModel[]) => void;
}

export const useStats = (statModels: iStatModel[]) => {
    const [stats, _setStats] = useState(statModels);

    const setValue = useCallback(
        (incomingStat: iStatModel) => {
            //find this name in the index array, splice it out and insert it back changed in that place

            _setStats((oldStats) =>
                oldStats.map((s) => {
                    return s.name === incomingStat.name ? { ...s, ...incomingStat } : s;
                })
            );
        },
        [_setStats]
    );
    const deserialize = useCallback(
        (stats: iStatModel[]) => {
            _setStats(stats);
        },
        [_setStats]
    );

    const modifier = useCallback(
        (name: string) => {
            const stat = stats.find((stat) => stat.name === name);
            if (stat) {
                return Math.floor((stat.value - 10) / 2);
            }
            return 0;
        },
        [stats]
    );
    const stat: iStats = {
        stats,
        setValue,
        modifier,
        deserialize,
    };

    return stat;
};
