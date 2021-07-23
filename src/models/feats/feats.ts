import { string } from "mathjs";
import { useCallback, useState } from "react";
import { iSerializable } from "../character";
import { Rollable } from "../items";

export interface iFeatModel extends Rollable {
    name: string;
    notes: string;
}
export const blankFeat: iFeatModel = {
    name: "",
    notes: "",
    rollableProps: []
}
export type iFeats = ReturnType<typeof useFeats> & iSerializable<iFeatModel>;

export const useFeats = (incomingFeats: iFeatModel[]) => {
    const [feats, setFeats] = useState<iFeatModel[]>(incomingFeats);

    const addFeat = useCallback((feat: iFeatModel) => setFeats(f => [...f, feat]), [setFeats]);
    const removeFeat = useCallback((id: number) => {
        setFeats(fs => {
            fs.splice(id, 1);
            return fs;
        })
    }, [setFeats])

    const serialize = useCallback(() => feats, [feats]);
    const deserialize = useCallback((f: iFeatModel[]) => setFeats(f), [setFeats]);

    const obj = {
        feats,
        addFeat,
        removeFeat,
        serialize,
        deserialize
    }
    return obj;
}