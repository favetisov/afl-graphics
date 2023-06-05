import { getUiDb } from '@/shared/tools/load-user';
import { colorSchemes, patterns } from '@/pages-components/igraphics/colorSchemes';

export class SchemaManager {
  schemes = {};
  currentSchema: '';
  patterns = {};
  currentPattern: '';

  constructor() {
    const db = getUiDb();
    db?.get('color-schemes').then(c => {
      if (c) {
        this.schemes = c.schemes;
        this.currentSchema = c.currentSchema;
      }
    });
    db?.get('patterns').then(c => {
      if (c) {
        this.patterns = c.patterns;
        this.currentPattern = c.currentPattern;
      }
    });
  }

  getCurrentScheme(seasonId?: number) {
    if (!seasonId) {
      return colorSchemes.find(s => s.value == this.currentSchema) || colorSchemes[0];
    } else {
      const val = this.schemes[seasonId];
      return colorSchemes.find(s => s.value == val) || colorSchemes[0];
    }
  }

  getCurrentPattern(seasonId?: number) {
    if (!seasonId) {
      return patterns.find(p => p == this.currentSchema) || patterns[0];
    } else {
      const val = this.patterns[seasonId];
      return patterns.find(p => p == val) || patterns[0];
    }
  }

  setColorScheme(schema: any, seasonId: number) {
    this.schemes[seasonId] = schema.value;
    const schemes = {};
    for (const seasonId in this.schemes) {
      schemes[seasonId] = this.schemes[seasonId];
    }
    const db = getUiDb();
    db?.put({
      category: 'color-schemes',
      schemes: schemes,
      currentSchema: schema.value,
    });
  }

  setPattern(pattern: any, seasonId: number) {
    if (seasonId) {
      this.patterns[seasonId] = pattern.value;
    }
    const ptrns = {};
    for (const seasonId in this.patterns) {
      ptrns[seasonId] = this.patterns[seasonId];
    }
    const db = getUiDb();
    db?.put({
      category: 'patterns',
      patterns: ptrns,
      currentPattern: pattern,
    });
  }
}
