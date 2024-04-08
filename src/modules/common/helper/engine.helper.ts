import { Engine } from "json-rules-engine";

export class EngineHelper {

    engine: Engine = new Engine();
    constructor() {
        this.engine.addOperator('isVersionEqualOrGreater', this.isVersionEqualOrGreater);
        this.engine.addOperator('afterDays', this.afterDays);
    }


    private isVersionEqualOrGreater(version1: string, version2: string): boolean {
        const [major1, minor1, patch1] = version1.split('.').map(Number);
        const [major2, minor2, patch2] = version2.split('.').map(Number);

        if (major1 !== major2) {
            return major1 > major2;
        }

        if (minor1 !== minor2) {
            return minor1 > minor2;
        }

        return patch1 >= patch2;
    }

    private afterDays(factValue: Date, jsonValue: number) {
        if (factValue == null || jsonValue == null) return false;
        const miliseconds =  new Date().getTime() - factValue.getTime();
        const daysoOfDifference = Math.floor(miliseconds / (1000 * 60 * 60 * 24));
        return daysoOfDifference >= jsonValue;
    }


    getEngine() {
        return this.engine;
    }

    getAutoEvent() {
        return {
            type: 'auto-event',
            params: {
            },
        };
    }
}