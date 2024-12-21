import {
  loadItem,
  loadList,
  newsPlain,
  recommendationsPlain,
  searchPlain,
} from "./manager.client";
import { createModelByName } from "./model-by-name";
import Dexie from "dexie";
import { schema } from "./../../schema";
import { envState } from "ftb-models";
import { AsyncSubject } from "rxjs";
import { getUiDb } from "../../../../tools/load-user";

export class ModelManager {
  private db: Dexie;
  private data = {};
  ready$ = new AsyncSubject();

  revertedJoins = Object.keys(schema).reduce((joins, eName) => {
    joins[eName] ??= {};
    for (const field in schema[eName].joins?.oneToMany) {
      const childName = schema[eName].joins?.oneToMany[field];
      joins[eName][childName] = field;
    }
    return joins;
  }, {});

  constructor() {
    if (typeof window !== "undefined") {
      this.db = new Dexie(envState.appKey + "_models");
      const stores = Object.keys(schema).reduce((stores, key) => {
        stores[key] = `_id`;
        return stores;
      }, {});
      this.db.version(4).stores(stores);
      this.unpackDb();
    }
  }

  async getModel(entityName: string, entityId: number) {
    const config = schema[entityName];
    if (!config) throw new Error("incorrect entity name");

    await this.getUpdates();
    const { item, entities } = await loadItem(entityName, entityId);
    let i = 0;
    const plain = { _id: item[i++] };
    Object.keys(schema[entityName].joins?.oneToOne || []).forEach((k) => {
      plain[k + "_id"] = item[i++];
    });
    plain["data"] = item.slice(i);
    await this.db[entityName].put(plain);
    this.plainToData(entityName, plain);

    await this.loadMissingEntities(entities);
    return this.data[entityName][entityId];
  }

  async getModelsList(
    entities: Array<{ entityName: string; entityId: number }>
  ) {
    await this.getUpdates();
    return entities.map((e) => this.data[e.entityName][e.entityId]);
  }

  async search(query: string) {
    await this.getUpdates();
    const { results, extraEntities } = await searchPlain(query);
    const entitiesToLoad = {};
    for (const k in results) {
      entitiesToLoad[k] = results[k].map((_id) => parseInt(_id));
    }
    for (const k in extraEntities) {
      entitiesToLoad[k] ??= [];
      entitiesToLoad[k].push(...extraEntities[k].map((_id) => parseInt(_id)));
    }

    await this.loadMissingEntities(entitiesToLoad);

    const result = {};
    for (const k in results) {
      result[k] = results[k].map((_id) => this.data[k][_id]);
    }

    return result;
  }

  async getRecommendations(leagueId: number) {
    await this.getUpdates();
    const entities = await recommendationsPlain(leagueId);
    await this.loadMissingEntities(entities);
    return {
      Team: entities.Team.map((id) => this.data["Team"][id]),
      Player: entities.Player.map((id) => this.data["Player"][id]),
      Stadium: entities.Stadium.map((id) => this.data["Stadium"][id]),
    };
  }

  async getNews(tags: string) {
    await this.getUpdates();
    const entities = await newsPlain(tags);
    await this.loadMissingEntities(entities);

    return entities.Post.map((pId) => this.data["Post"][pId]);
  }

  private async unpackDb() {
    await Promise.all(
      Object.keys(schema).map(
        async (key) =>
          (this.data[key + "_plain"] = await this.db[key].toArray())
      )
    );

    for (const eName of Object.keys(schema)) {
      this.data[eName] ??= {};
      this.data[eName + "_plain"].forEach((r) => {
        this.plainToData(eName, r);
      });
    }

    await this.getUpdates();
    this.ready$.next(true);
    this.ready$.complete();
  }

  private plainToData(eName, row) {
    const _id = row._id + "";
    this.data[eName][_id] ??= createModelByName(eName);
    this.data[eName][_id]._id = _id;
    let i = 0;
    [
      ...(schema[eName].fields.list || []),
      ...(schema[eName].fields.public || []),
      ...(schema[eName].fields.admin || []),
    ].forEach((field) => {
      this.data[eName][_id][field] = row.data[i++];
    });

    for (const j in schema[eName].joins.oneToOne) {
      const parentName = schema[eName].joins.oneToOne[j];
      const parentId = row[j + "_id"];
      if (parentId) {
        this.data[parentName] ??= {};
        this.data[parentName][parentId + ""] ??= createModelByName(parentName);
        this.data[eName][_id][j] = this.data[parentName][parentId + ""];
        const field = this.revertedJoins[parentName][eName];
        if (field) {
          this.data[parentName][parentId + ""][field + "_map"] ??= {};
          // check that we haven't added this relation yet (needed for case when we build different models in one manager)
          if (!this.data[parentName][parentId + ""][field + "_map"][_id]) {
            this.data[parentName][parentId + ""][field].push(
              this.data[eName][_id]
            );
          }
          this.data[parentName][parentId + ""][field + "_map"][_id] = true;
        }
      }
    }
  }

  private async getUpdates() {
    const uiDb = getUiDb();
    const lastUpdate = await uiDb.get("manager_last_update");

    const clearAllData = () => {
      for (const eName of Object.keys(schema)) {
        this.data[eName] ??= {};
        this.db[eName].clear();
      }
    };

    // if (!lastUpdate?._id) {
    //   clearAllData();
    //   const lastUpdateId = await getLastUpdate();
    //   await uiDb.put({ category: "manager_last_update", _id: lastUpdateId });
    // } else {
    //   const { entities, lastUpdateId } = await getUpdatesSince(lastUpdate._id);
    //   await uiDb.put({ category: "manager_last_update", _id: lastUpdateId });
    //   if (entities["All"]?.length) {
    //     clearAllData();
    //   } else {
    //     for (const eName in entities) {
    //       entities[eName].forEach((_id) => delete this.data[eName][_id]);
    //     }
    //   }
    // }
    clearAllData();
  }

  private async loadMissingEntities(entities: {
    [eName: string]: Array<string | number>;
  }) {
    const entitiesToLoad = {};
    for (const eName in entities) {
      // entitiesToLoad[eName] = entities[eName].filter(
      //   (_id) => !this.data[eName][_id]?._id
      // );
      entitiesToLoad[eName] = entities[eName];
    }

    if (!Object.keys(entitiesToLoad).some((e) => entitiesToLoad[e].length))
      return;

    const entitiesToPut = {};
    await loadList(entitiesToLoad, (eName, row) => {
      entitiesToPut[eName] ??= [];
      let i = 0;
      const toPut = { _id: row[i++] };
      Object.keys(schema[eName].joins?.oneToOne || []).forEach((k) => {
        toPut[k + "_id"] = row[i++];
      });
      toPut["data"] = row.slice(i);
      entitiesToPut[eName].push(toPut);
      this.plainToData(eName, toPut);
    });

    Object.keys(entitiesToPut).map((eName) =>
      this.db[eName].bulkPut(entitiesToPut[eName])
    );
  }
}

let manager;
export const getModelManager = async () => {
  if (!manager) manager = new ModelManager();
  await manager.ready$.toPromise();
  return manager;
};
