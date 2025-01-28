import { useState } from "react";
import { getModelManager } from "@/shared/schema/src/models/manager/model-manager";

export const useModel = (entityName: string, itemId: number) => {
  const [item, setItem] = useState();
  const [currentId, setCurrentId] = useState<number>();

  if (itemId !== currentId) {
    setItem(null);
    setCurrentId(itemId);
    getModelManager().then((m) => {
      m.getModel(entityName, itemId).then((m) => {
        console.log(m, "M");
        setItem(m);
      });
    });
  }

  return item;
};
